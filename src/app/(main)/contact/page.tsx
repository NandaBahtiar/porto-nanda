'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { saveContactSubmission } from '@/app/actions/contact';

const initialState = {
  message: null,
  errors: {},
};

// Komponen terpisah untuk Tombol Submit agar bisa menggunakan useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
      <button
          type="submit"
          disabled={pending}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition-colors disabled:bg-gray-400"
      >
        {pending ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useActionState(saveContactSubmission, initialState);

  return (
      <section className="p-8 md:p-16">
        <h2 className="text-3xl font-bold mb-8">Hubungi Saya</h2>
        <form action={formAction} className="max-w-lg mx-auto space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Pesan
            </label>
            <textarea id="message" name="message" rows={5} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            {state.errors?.message && <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>}
          </div>

          <SubmitButton />

          {state.message && <p className="text-green-600 mt-4">{state.message}</p>}
        </form>
      </section>
  );
}