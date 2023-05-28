import Link from "next/link";

const About = () => {
  return (
    <div className="hero h-full w-screen grow rounded-md bg-base-200 p-2">
      <div className="hero-content h-full w-full flex-col">
        {/* <Image src="/images/me.png" alt="Jack Frate" width={400} height={400} /> */}
        <div>
          {/* TODO: animate this appearing from bottom */}
          <h1 className="pb-4 text-6xl font-bold text-primary">
            Hi, I&apos;m Jack Frate
          </h1>
          <h1 className="text-6xl font-bold text-secondary">
            I build things for the web
          </h1>
          <div className="flex flex-col gap-4 self-start pt-4">
            <p className="pb-6">Check out some cool projects I've made</p>
            <div className="flex flex-row gap-4">
              <Link href="/demo/video-recorder">
                <button className="btn-outline btn-primary btn">
                  Record a video
                </button>
              </Link>
              <Link href="/demo/spatial-audio">
                <button className="btn-outline btn-primary btn">
                  Spatial audio
                </button>
              </Link>
            </div>
          </div>
          <p className="py-6">
            I&apos;m a fullstack engineer who leans towards frontend. I have
            experience in both React and Angular, with specialties in modern web
            API&apos;s such as canvas and MediaStream. When coding in my free
            time, I&apos;ve been focused on making projects with Next and
            Vercel.
          </p>
          <p className="pb-6">
            I&apos;m just happy to be in an industry where I enjoy what I&apos;m
            doing.
          </p>

          <div className="flex flex-col gap-3 lg:flex-row">
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
                Source code for this site
              </button>
            </Link>
          </div>
          <p className="py-6"></p>
        </div>
      </div>
    </div>
  );
};

export default About;
