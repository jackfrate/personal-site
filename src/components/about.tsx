import Link from "next/link";

const About = () => {
  return (
    <div className="hero h-full w-screen grow rounded-md bg-base-200 p-2">
      <div className="hero-content h-full w-full flex-col">
        {/* <Image src="/images/me.png" alt="Jack Frate" width={400} height={400} /> */}
        <div>
          {/* TODO: animate this appearing from bottom */}
          <h1 className="pb-4 text-6xl font-bold text-primary">
            Hi, I'm Jack Frate
          </h1>
          <h1 className="text-6xl font-bold text-secondary">
            I build things for the web
          </h1>
          <p className="py-6">
            I'm a fullstack engineer who leans towards frontend. I have
            experience in both React and Angular, with specialties in media APIs
            for the web. I'm just happy to be in an industry where I enjoy what
            I'm doing.
          </p>
          <div className="flex flex-col gap-3 lg:flex-row">
            <Link href="/experience">
              <button className="btn-outline btn-primary btn">
                See my experience
              </button>
            </Link>
            <Link href="/demo">
              <button className="btn-outline btn-primary btn">
                Cool Tech Demo (Record a Video)
              </button>
            </Link>
          </div>
          <p className="py-6">
            {/* Feel free to record yourself judging my portfolio. The video is
            local to your machine, nobody but you has it. */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
