import { motion as m } from "motion/react";

const title = "Hello World i am the king of the lands of the free".split("");

const LandingPage = () => {
  return (
    <main className="">
      <div className="container flex lg:flex-row  flex-col items-center lg:items-start gap-4 lg:justify-between   mx-auto  overflow-hidden">
        <m.div
          exit={{
            opacity: 0,
            x: -250,
            transition: {
              duration: 0.4,
            },
          }}
          className=" text-4xl lg:text-5xl  lg:pt-40  max-w-fit"
        >
          {title.map((letter, i) => {
            const key = letter + "/" + i;
            if (letter === " ") return <span className="mr-2" key={key} />;
            return (
              <m.span
                className="inline-block"
                initial={{
                  opacity: 0,
                  x: -20,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: {
                    delay: i * 0.03,
                  },
                }}
                key={key}
                layout
              >
                {letter}
              </m.span>
            );
          })}
        </m.div>

        <m.img
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
            },
          }}
          exit={{
            opacity: 0,
            x: 250,
            transition: {
              duration: 0.4,
            },
          }}
          src={"/images/conversation-1"}
          alt="conversation hero"
          className="w-[40rem] mx-auto  -mt-20   "
        />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="w-full bg-slate-300 rounded h-20"></div>
        <div className="w-full bg-slate-300 rounded h-20"></div>
        <div className="w-full bg-slate-300 rounded h-20"></div>
        <div className="w-full bg-slate-300 rounded h-20"></div>
        <div className="w-full bg-slate-300 rounded h-20"></div>
        <div className="w-full bg-slate-300 rounded h-20"></div>
        <div className="w-full bg-slate-300 rounded h-20"></div>
        <div className="w-full bg-slate-300 rounded h-20"></div>
        <div className="w-full bg-slate-300 rounded h-20"></div>
        <div className="w-full bg-slate-300 rounded h-20"></div>
      </div>
    </main>
  );
};

export default LandingPage;
