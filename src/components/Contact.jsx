export default function Contact() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 my-8">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Contact Us</h1>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        If you have any questions about coin valuations or listings, reach out to us at:
      </p>
      <p className="text-slate-800 font-semibold text-base">
        <strong>Email:</strong> <a href="mailto:support@coincheckindia.com" className="text-emerald-600 underline">support@coincheckindia.com</a>
      </p>
    </div>
  );
}