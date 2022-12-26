const About = () => {
  return (
    <div className="hero m-4 w-full rounded-md bg-base-200 p-2 2xl:max-w-[66%] 2xl:self-start">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://placeimg.com/260/400/arch"
          className="max-w-sm rounded-lg shadow-2xl"
        />
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
            local to your machine, nobody but you has it. You can also minimize
            this if its annoying.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
