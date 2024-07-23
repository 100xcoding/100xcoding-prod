import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-dark-400  text-white">
      <h2 className="text-green-500 font-semibold text-4xl capitalize mb-5">
        User not found!
      </h2>
      {/* <p>We could not find the page you were looking for.</p> */}
      <p>
        Go back to the{" "}
        <Link
          href="/"
          className="text-green-500 underline font-semibold text-lg"
          aria-label="Home Page"
        >
          {" "}
          Home Page
        </Link>{" "}
      </p>
    </main>
  );
};

export default NotFound;
