import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'https://school-admin-dy0c.onrender.com';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { parentName, studentName, phone, classApplying, email, message } = body;

        if (!parentName || !studentName || !phone || !classApplying) {
            return NextResponse.json(
                { error: "Please fill all required fields." },
                { status: 400 }
            );
        }

        // Save to backend database
        try {
            await fetch(`${BACKEND_API_URL}/api/enquiries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
        } catch (dbError: any) {
            console.error("Database Save Error:", dbError);
            return NextResponse.json({ error: "Failed to save to database: " + dbError.message }, { status: 500 });
        }

        // Set up Nodemailer for sending Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'digitalsolution3600@gmail.com',
                pass: 'fikbdzqnvfgxzmdk',
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Email options
        const mailOptions = {
            from: '"Admission Enquiry" <digitalsolution3600@gmail.com>', 
            to: 'digitalsolution3600@gmail.com, sjcsjharsuguda@gmail.com', // Admin emails to receive details
            subject: `New Admission Enquiry - ${studentName}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #004080;">New Admission Enquiry</h2>
                    <p>A new enquiry has been submitted on the website. Here are the details:</p>
                    <table style="width: 100%; max-width: 600px; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Student Name</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${studentName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Parent Name</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${parentName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Email</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${email || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Phone Number</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Class Applying For</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${classApplying}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Message</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${message || 'N/A'}</td>
                        </tr>
                    </table>
                </div>
            `,
        };

        // Send email in the background to prevent slow form submission
        transporter.sendMail(mailOptions).catch((emailError: any) => {
            console.error("Background Email Error:", emailError);
        });

        return NextResponse.json({ success: true, message: "Enquiry submitted successfully! We will contact you soon." });
    } catch (error: any) {
        console.error("Enquiry error:", error);
        return NextResponse.json(
            { error: "General Error: " + error.message },
            { status: 500 }
        );
    }
}
