import Link from "next/link";
import { demos } from "../pages/demo";
import CoolTitle from "./cool-title/CoolTitle";

const About = () => {
  return (
    <div className="hero h-full w-screen grow rounded-md  p-2">
      <div className="hero-content h-full w-full flex-col">
        {/* <Image src="/images/me.png" alt="Jack Frate" width={400} height={400} /> */}
        <div className="flex flex-col items-center gap-4">
          <div className="cool-title-container flex flex-col md:flex-row">
            <CoolTitle />
          </div>
          <div className="flex flex-col items-center gap-4 self-start">
            <p className="py-6 text-center">
              I&apos;m a fullstack engineer with 3+ years of industry
              experience. I make things for the web.
            </p>
            <div className="card flex w-[90%] flex-col items-center gap-4 bg-neutral px-10 py-4 md:w-full md:bg-base-100">
              <h1 className="card-title">Some Personal Projects</h1>
              <div className="flex flex-col items-center gap-4 md:flex-row">
                {demos.map((demo) => (
                  <Link href={demo.href} key={demo.title}>
                    <button className="btn-outline btn-primary btn">
                      {demo.title}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="card flex w-[90%] flex-col items-center gap-4 bg-neutral px-10 py-4 md:w-full md:bg-base-100">
            <h1 className="card-title">More About Me</h1>
            <div className="card-actions">
              <div className="flex flex-col items-center gap-3 md:flex-row">
                <Link href="/experience">
                  <button className="btn-outline btn-primary btn">
                    See my experience
                  </button>
                </Link>
                <Link
                  href="https://github.com/jackfrate/personal-site"
                  target="_blank"
                >
                  <button className="btn-outline btn-primary btn">
                    Website Source Code
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <p className="py-6"></p>
        </div>
      </div>
    </div>
  );
};

export default About;
