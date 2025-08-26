import React from 'react';

interface NewMessageEmailProps {
    name: string;
    email: string;
    message: string;
}

export const NewMessageEmail: React.FC<Readonly<NewMessageEmailProps>> = ({
                                                                              name,
                                                                              email,
                                                                              message,
                                                                          }) => (
    <div>
        <h1>Pesan Baru dari Website Portfolio!</h1>
        <p>
            Anda telah menerima pesan baru dari formulir kontak.
        </p>
        <hr />
        <ul>
            <li><strong>Nama:</strong> {name}</li>
            <li><strong>Email:</strong> {email}</li>
        </ul>
        <hr />
        <h2>Isi Pesan:</h2>
        <p>{message}</p>
    </div>
);