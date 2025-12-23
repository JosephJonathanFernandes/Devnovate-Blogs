import nodemailer from 'nodemailer';

// Service to create nodemailer transporter
export const createTransporterService = (options: any) => {
    return nodemailer.createTransport(options);
};
