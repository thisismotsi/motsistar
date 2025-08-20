// 4. Quizizz
export default function Quizizz() {
  return (
    <div className="p-6">
      <p className="mb-2">To use Quizizz in your app:</p>
      <ol className="list-decimal list-inside">
        <li>
          Visit{" "}
          <a
            className="text-blue-600 underline"
            href="https://quizizz.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            quizizz.com
          </a>
        </li>
        <li>Create or select a quiz from your dashboard.</li>
        <li>Use the share or assign link to provide access to learners.</li>
        <li>API access is not publicly documented — best to redirect users.</li>
      </ol>
    </div>
  );
}
