import 'reflect-metadata';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 2, 10, 13),
      provider_id: 'xyz',
      user_id: 'xyz1',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('xyz');
  });

  it('should not be able to create two appointments at the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime();
    });

    await createAppointment.execute({
      date: new Date(2021, 2, 10, 12),
      provider_id: 'xyz',
      user_id: 'xyz1',
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 10, 12),
        provider_id: 'xyz',
        user_id: 'xyz1',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 10, 11),
        provider_id: 'xyz',
        user_id: 'xyz1',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 10, 13),
        provider_id: 'xyz',
        user_id: 'xyz',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 11, 7),
        provider_id: 'xyz',
        user_id: 'xyz1',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 11, 18),
        provider_id: 'xyz',
        user_id: 'xyz1',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
