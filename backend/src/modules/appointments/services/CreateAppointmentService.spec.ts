import AppError from "@shared/errors/AppError";

import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentsRepository";

let createAppointment: CreateAppointmentService;

describe("CreateAppointment", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123456',
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 16, 13, 0, 0).getTime();
    });

    const appointmentDate = new Date(2020, 6, 16, 16, 0, 0);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user_id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
}
