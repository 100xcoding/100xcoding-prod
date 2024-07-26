"use client";
import Link from "next/link";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="h-full w-full  bg-dark-300  dark:bg-grid-white/[0.2] bg-grid-green-500/[0.15]  relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-dark-300  [mask-image:radial-gradient(ellipse_at_center,transparent_10%,#0D0F10)]"></div>
      <div className="flex   text-white  h-full max-h-screen">
        <div className="container mx-auto z-30 flex flex-col  items-center gap-10 lg:gap-0">
          <div className="lg:max-w-[956px] mx-auto lg:size-full  flex flex-col justify-start pt-6 md:pt-10 lg:pt-40 gap-4 lg:px-4">
            <p className="bg-blue-600 text-blue-500 font-semibold tracking-wider text-base md:text-lg capitalize rounded-full w-fit px-6 py-2 ">
              Build real world projects 🚀
            </p>
            <h1 className="text-4xl   md:text-[3.2rem] mt-2 lg:mt-10 font-medium md:tracking-wide   leading-[1.2] md:leading-[1.4]">
              Transform Your{" "}
              <span className="text-primary font-bold">Coding</span> Expertise{" "}
              <br /> with Interactive{" "}
              <span className="text-primary font-bold">Projects</span> and{" "}
              <span className="text-primary font-bold">Challenges.</span>
            </h1>

            <Link
              aria-label="expore challenges"
              href="/challenges"
              className="font-semibold tracking-wide uppercase bg-green-600 text-green-500 px-6 py-2 rounded-full md:w-fit text-center md:mt-10 mt-2 text-lg"
            >
              Explore now 🚀
            </Link>
          </div>
          <div className="">
            <Image
              src="/hero.webp"
              alt="hero"
              height={500}
              width={500}
              layout="intrinsic"
              priority
              className="object-cover lg:hidden aspect-video"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAC8AI0DASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EAB4QAQADAQEAAwEBAAAAAAAAAAABAhIRAxNBUQRh/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABoRAQEBAAMBAAAAAAAAAAAAAAARAQISMVH/2gAMAwEAAhEDEQA/APowboMjSWRkJFAGYGYGAzAwMEsEyBZJJ5lOZAlk5PZOwFkGkAev0Ol63VQehMh0vQN0Ol63QN1uk63QP1ul63QN0syHSzIDMpzIzJLSKFpTtI2lO0oBMh0JkOg9XQdJoNKh+h0mg0B+h0mg0CnW6nptAp1tJ6DQKaCbE0WbAabEmwTZObANrJzZrWTmwozYNEmwaB6em0lptKimg0noNApoNJ6DQK6bSWg0Cum0loNArNgmyU3LNwUmxJsSbkm4GtYk2Ja6c3FUmxdJTcNg9TYbR221RbQaR0GgW0GktBoFtBtHQbBbbbQ2E3Bablm6U3JNwVm5JulN07egqtrp2ulb0St6kF5uX5HNb2j9J80fqwe3sNobbYi+22hsNgvsNo7DYLbDaOwm4q03LN0ZuSfQF59CT6Oe3olf2iPtYOm3qjb2/wBct/f8RteZ+1g6b/0I29plLoJcKabzP2GgZO2o9rbbc+x2qr7HTn2OkFtNpHTaBSblm6c2JayilrpX9eJ39ELW6sFL+0ylNpkOgm8viUegzMDMzAzMwOvYxZE0N1uKxY0SnBoSofrdBigTKdpUmE7QURtJDWghuprMzMozMwMzMDMzA6MmiqmRirFbLEGiDRU0VWoXg8PlslE5glqr5LNSjlvRC1eO61Eb+ZV9crHtSYI1WdyMzMIzMwMzMD08jFT5HLk0SKmip4gYhQuWyfg8BPITVXgcBGap2o6ZqSapo5LURv5/jttVO1EzYrhmswV138+o28+OmcqkSYZgGmWZmB7fB4bjccWgiB4MQbiheDw3B4BONw/G4onMFmFJgJhBGap2qvMEtDOjntVO1XRaE5hnNVzW80ppx1zCc1dM5DmyHF5oGG+xMewLM5oIgZRhZgZhAAksnksgSYJMKSSWdErQSYUsSXPfVTmCTCkklrAkwXh5Bof/2Q=="
            />
          </div>
        </div>
        <Image
          src="/hero.webp"
          alt="hero"
          height={400}
          width={600}
          layout="responsive"
          priority
          className="max-w-[50%] ml-auto object-cover hidden lg:block"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAC8AI0DASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EAB4QAQADAQEAAwEBAAAAAAAAAAABAhIRAxNBUQRh/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABoRAQEBAAMBAAAAAAAAAAAAAAARAQISMVH/2gAMAwEAAhEDEQA/APowboMjSWRkJFAGYGYGAzAwMEsEyBZJJ5lOZAlk5PZOwFkGkAev0Ol63VQehMh0vQN0Ol63QN1uk63QP1ul63QN0syHSzIDMpzIzJLSKFpTtI2lO0oBMh0JkOg9XQdJoNKh+h0mg0B+h0mg0CnW6nptAp1tJ6DQKaCbE0WbAabEmwTZObANrJzZrWTmwozYNEmwaB6em0lptKimg0noNApoNJ6DQK6bSWg0Cum0loNArNgmyU3LNwUmxJsSbkm4GtYk2Ja6c3FUmxdJTcNg9TYbR221RbQaR0GgW0GktBoFtBtHQbBbbbQ2E3Bablm6U3JNwVm5JulN07egqtrp2ulb0St6kF5uX5HNb2j9J80fqwe3sNobbYi+22hsNgvsNo7DYLbDaOwm4q03LN0ZuSfQF59CT6Oe3olf2iPtYOm3qjb2/wBct/f8RteZ+1g6b/0I29plLoJcKabzP2GgZO2o9rbbc+x2qr7HTn2OkFtNpHTaBSblm6c2JayilrpX9eJ39ELW6sFL+0ylNpkOgm8viUegzMDMzAzMwOvYxZE0N1uKxY0SnBoSofrdBigTKdpUmE7QURtJDWghuprMzMozMwMzMDMzA6MmiqmRirFbLEGiDRU0VWoXg8PlslE5glqr5LNSjlvRC1eO61Eb+ZV9crHtSYI1WdyMzMIzMwMzMD08jFT5HLk0SKmip4gYhQuWyfg8BPITVXgcBGap2o6ZqSapo5LURv5/jttVO1EzYrhmswV138+o28+OmcqkSYZgGmWZmB7fB4bjccWgiB4MQbiheDw3B4BONw/G4onMFmFJgJhBGap2qvMEtDOjntVO1XRaE5hnNVzW80ppx1zCc1dM5DmyHF5oGG+xMewLM5oIgZRhZgZhAAksnksgSYJMKSSWdErQSYUsSXPfVTmCTCkklrAkwXh5Bof/2Q=="
          sizes="(max-width: 1024px) 50vw, 600px"
        />
      </div>
    </div>
  );
};
