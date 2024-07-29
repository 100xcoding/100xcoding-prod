import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-dark-400  text-white">
      <Image
        src="/error.svg"
        alt="404 Web illustrations by Storyset"
        width={"500"}
        height={"500"}
      />

      <p>We could not find the page you were looking for.</p>
      <p className="my-3">
        Go back to the{" "}
        <Link
          href="/"
          className="bg-green-500  text-white  font-semibold text-xl px-4 py-2 rounded-md"
          aria-label="Home Page"
        >
          {" "}
          Home Page
        </Link>{" "}
      </p>
      <Link
        href="https://storyset.com/web"
        className="block mt-4 text-dark-700 text-xs text"
      >
        Web illustrations by Storyset
      </Link>
    </main>
  );
};

export default NotFound;
