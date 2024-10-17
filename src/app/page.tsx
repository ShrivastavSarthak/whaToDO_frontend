import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen mx-auto w-[50%] ">
      <div className="w-full">
        <h1 className="text-[4rem] font-bold ">Welcome to the whaToDo🚀</h1>
        <h2 className="text-2xl">Remember to start the projects</h2>
        <ol className="mt-2">
          <li>Remove this template not file and then start the project </li>
          <li>
            Use app routing{" "}
            <Link className="text-gray-200 underline" target="_blank" href="https://nextjs.org/docs/app/building-your-application/routing/pages">
              Need to know app routing
            </Link>{" "}
          </li>
          <li>Do not create the file or folder outside the src </li>
          <li>the app dir is only reserved for the routing </li>
        </ol>
        <h2>Now let's build the project 🤗🤗🤗</h2>
      </div>
    </div>
  );
}
