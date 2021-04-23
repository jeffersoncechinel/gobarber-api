import { format, getHours, isBefore, startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { ptBR } from 'date-fns/locale';

interface IRequest {
  date: Date;
  provider_id: string;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot create an appointment on past date');
    }

    if (user_id === provider_id) {
      throw new AppError('You cannot create an appointment for yourself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm'
      );
    }

    if (
      await this.appointmentsRepository.findByDate(appointmentDate, provider_id)
    ) {
      throw new AppError(
        'An appointment for this date and time already exists.'
      );
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formattedDate = format(appointmentDate, 'dd/MM/yyyy - HH:mm', {
      locale: ptBR,
    });

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `New appointment created for you ${formattedDate}`,
    });

    const key = `provider-appointments:${provider_id}:${format(
      appointmentDate,
      'yyyy-M-d'
    )}`;

    await this.cacheProvider.invalidate(key);

    return appointment;
  }
}

export default CreateAppointmentService;
