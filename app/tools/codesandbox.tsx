// 5. CodeSandbox
export default function CodeSandbox() {
  return (
    <div className="p-6">
      <p className="mb-2">
        CodeSandbox does not offer a public JavaScript API.
      </p>
      <p>
        For now, we recommend directing users to:{" "}
        <a
          className="text-blue-600 underline"
          href="https://codesandbox.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          codesandbox.io
        </a>
      </p>
      <p className="mt-2 text-sm text-gray-600">
        To integrate deeply, you must apply for API access or embed with OAuth.
      </p>
    </div>
  );
}
