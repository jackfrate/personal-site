const About = () => {
  return (
    <div className="hero h-full w-screen grow rounded-md bg-base-200 p-2">
      <div className="hero-content h-full w-full flex-col">
        {/* <Image src="/images/me.png" alt="Jack Frate" width={400} height={400} /> */}
        <div>
          {/* TODO: animate this appearing from bottom */}
          <h1 className="text-5xl font-bold">Welcome to my Portfolio</h1>
          <p className="py-6">
            My name is Jack Frate. I'm a fullstack software engineer with
            specialties in Typescript, Frontend, and Web Video API's.
          </p>
          {/* TODO: make this work */}
          <button className="btn-primary btn">
            Here's a screen recording demo
          </button>
          <p className="py-6">
            Feel free to record yourself judging my portfolio. The video is
            local to your machine, nobody but you has it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
