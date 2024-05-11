export default function LandingPage({ Link }) {
  return (
    <div className="tw-container tw-mx-auto tw-h-screen">
      <Header Link={Link} />
      <Hero />
      <Featuers />
      <DownloadArea Link={Link} />
      <Footer />
    </div>
  );
}

export function Header({ Link }) {
  return (
    <div className="tw-bg-spacialPurple tw-flex tw-justify-between tw-items-center tw-h-20 tw-w-full tw-px-20">
      <h1 className="tw-text-white">Taskello</h1>
      {/* <div>
        <ul className="tw-flex tw-flex-row tw-gap-8 tw-text-white">
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
        </ul>
      </div> */}
      <Link to="/signin">
        <button className="tw-text-white">Login</button>
      </Link>
    </div>
  );
}
export function Hero() {
  return (
    <>
      <div className="   tw-relative    tw-flex tw-flex-col  ">
        <div className="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-spacialPurple tw-p-5 sm:tw-p-20 tw-pb-0">
          <div className="tw-text-white tw-w-full sm:tw-w-1/2   tw-h-96">
            <h2 className="">"Visualize your workflow, empower your team."</h2>
            <p>
              Revolutionize your workflow with our Kanban app. Simplify task
              management, enhance collaboration, and supercharge productivity.
              Experience seamless project management like never before.
            </p>
            <button className=" ">Start now</button>
          </div>

          <img
            className=" tw-absolute tw-bottom-6 md:tw-bottom-0 tw-w-full "
            style={{ maxWidth: "960px" }}
            src="heroPicture.svg"
            alt=""
            srcset=""
          />
        </div>
        <svg
          className="  "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="rgb(154 133 244 / 1)"
            fill-opacity="2"
            d="M0,160L15,165.3C30,171,60,181,90,170.7C120,160,150,128,180,149.3C210,171,240,245,270,234.7C300,224,330,128,360,106.7C390,85,420,139,450,186.7C480,235,510,277,540,256C570,235,600,149,630,149.3C660,149,690,235,720,229.3C750,224,780,128,810,90.7C840,53,870,75,900,85.3C930,96,960,96,990,106.7C1020,117,1050,139,1080,128C1110,117,1140,75,1170,85.3C1200,96,1230,160,1260,186.7C1290,213,1320,203,1350,186.7C1380,171,1410,149,1425,138.7L1440,128L1440,0L1425,0C1410,0,1380,0,1350,0C1320,0,1290,0,1260,0C1230,0,1200,0,1170,0C1140,0,1110,0,1080,0C1050,0,1020,0,990,0C960,0,930,0,900,0C870,0,840,0,810,0C780,0,750,0,720,0C690,0,660,0,630,0C600,0,570,0,540,0C510,0,480,0,450,0C420,0,390,0,360,0C330,0,300,0,270,0C240,0,210,0,180,0C150,0,120,0,90,0C60,0,30,0,15,0L0,0Z"
          ></path>
        </svg>
      </div>
    </>
  );
}
export function Featuers() {
  return (
    <div
      className="tw-bg-black tw-h-fit tw-w-full tw--z-30 "
      style={{ backgroundColor: "#1E1E1E" }}
    >
      <div className="tw-flex tw-w-full tw-flex-col-reverse md:tw-flex-row   ">
        <div className="tw-w-full sm:tw-w-1/3 tw-flex tw-p-5 sm:tw-p-0  tw-justify-center tw-flex-col tw-text-white">
          <h2 className="lg:tw-text-nowrap">Unlock Your Team's Superpowers!</h2>
          <p>
            Empower your team with Productify, the ultimate Kanban app designed
            to supercharge productivity and collaboration. Say goodbye to chaos
            and hello to seamless project management!
          </p>
        </div>
        <div
          className="tw-w-1/2 tw-h-96 tw-ml-auto tw-flex tw-items-start tw-justify-end tw--translate-y-5 tw-relative "
          style={{
            background: "url(blob2.png)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            className="tw-absolute tw-w-full tw-h-full -tw-left-10 sm:tw-left-20  tw-top-10"
            src="frame3.svg"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <div className="tw-flex tw-w-full tw-flex-col-reverse  md:tw-flex-row-reverse ">
        <div className="tw-w-full sm:tw-w-1/3 tw-flex  tw-justify-center tw-flex-col  tw-text-white tw-p-5 sm:tw-p-0 ">
          <h2 className="lg:tw-text-nowrap">Tailored to Fit Your Workflow!</h2>
          <p className=" ">
            Our app is as unique as your team. From customizable boards to
            flexible task organization, Productify adapts to your workflow,
            ensuring a perfect fit every time. Say hello to productivity, your
            way!
          </p>
        </div>
        <div
          className="tw-w-1/2  tw-h-96 tw-mr-auto tw-flex tw-items-start tw-justify-end tw--translate-y-5 tw-relative"
          style={{
            background: "url(blob3.png)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            className="tw-absolute tw--right-20 tw-bottom-16 sm:tw-bottom-0"
            width={"468px"}
            height={"393px"}
            src="fram2.svg"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <div className="tw-flex tw-w-full tw-flex-col-reverse md:tw-flex-row   ">
        <div className="tw-w-full sm:tw-w-1/3 tw-flex  tw-justify-center tw-flex-col  tw-text-white tw-p-5 sm:tw-p-0 ">
          <h2 className="lg:tw-text-nowrap">
            Streamline Teamwork, Amplify Results
          </h2>
          <p className=" tw-w-full">
            Productify simplifies task management, enabling your team to focus
            on what they do best. With intuitive features and customizable
            boards, managing projects has never been more efficient or
            enjoyable.
          </p>
        </div>
        <div
          className="tw-w-1/2 tw-h-96 tw-ml-auto tw-flex tw-items-start tw-justify-end tw--translate-y-5 tw-relative "
          style={{
            background: "url(blob2.png)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            className="tw-absolute tw-w-full tw-h-full -tw-left-10 sm:tw-left-20  tw-top-10"
            src="Frame 1.svg"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
  );
}

export function DownloadArea({ Link }) {
  return (
    <div className="tw-bg-spacialPurple  md:tw-h-screen tw-w-full tw-pt-10 md:tw-pt-48 tw-shadow-2xl tw-shadow-spacialPurple tw-flex tw-justify-center tw-items-start tw-flex-wrap">
      <div className="tw-w-full tw-flex tw-justify-center">
        <p className="tw-text-xl md:tw-text-7xl tw-font-extrabold tw-text-white">
          Ready To Start Your{" "}
          <span className="tw-bg-yellow-500 tw-rounded-full tw-p-2 md:tw-p-5">
            Journy?
          </span>
        </p>
      </div>
      <div className="tw-flex tw-flex-row tw-gap-10 tw-flex-col md:tw-flex-row">
        <div className="tw-bg-yellow-400 tw-h-72 tw-w-56 tw-p-8 tw-rounded tw-flex tw-flex-col tw-items-center tw-gap-6">
          <svg
            width="209"
            height="100"
            viewBox="0 0 209 208"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M187.164 69.9636C191.421 80.3432 193.771 91.7065 193.771 103.635H208.303C208.303 89.8015 205.576 76.5842 200.619 64.4998L187.164 69.9636ZM193.771 103.635C193.771 109.971 193.108 116.146 191.849 122.096L206.07 125.073C207.535 118.15 208.303 110.978 208.303 103.635H193.771ZM191.849 122.096C184.568 156.524 157.305 183.652 122.705 190.897L125.697 205.047C165.935 196.622 197.603 165.112 206.07 125.073L191.849 122.096ZM122.705 190.897C116.725 192.149 110.52 192.809 104.152 192.809V207.269C111.531 207.269 118.74 206.505 125.697 205.047L122.705 190.897ZM104.152 192.809C97.7834 192.809 91.5779 192.149 85.5982 190.897L82.606 205.047C89.5637 206.505 96.772 207.269 104.152 207.269V192.809ZM14.5328 103.635C14.5328 91.6978 16.886 80.3255 21.1494 69.9392L7.6955 64.4714C2.73197 76.5636 0 89.7909 0 103.635H14.5328ZM85.5982 190.897C50.9987 183.652 23.7346 156.524 16.4541 122.096L2.23272 125.073C10.6995 165.112 42.3684 196.622 82.606 205.047L85.5982 190.897ZM16.4541 122.096C15.1959 116.146 14.5328 109.971 14.5328 103.635H0C0 110.978 0.768688 118.15 2.23272 125.073L16.4541 122.096ZM21.1494 69.9392C32.2458 42.9061 56.2987 22.5071 85.5982 16.3724L82.606 2.22164C48.514 9.3597 20.5868 33.0657 7.6955 64.4714L21.1494 69.9392ZM85.5982 16.3724C91.5779 15.1204 97.7834 14.4606 104.152 14.4606V0C96.772 0 89.5637 0.764872 82.606 2.22164L85.5982 16.3724ZM104.152 14.4606C110.52 14.4606 116.725 15.1204 122.705 16.3724L125.697 2.22173C118.74 0.764872 111.531 0 104.152 0V14.4606ZM122.705 16.3724C152.014 22.5089 176.073 42.9184 187.164 69.9636L200.619 64.4998C187.734 33.08 159.8 9.36192 125.697 2.22173L122.705 16.3724ZM117.279 11.495C119.952 19.8315 129.848 51.8949 133.903 81.3541L148.302 79.3914C144.066 48.6213 133.837 15.5603 131.124 7.09921L117.279 11.495ZM133.903 81.3541C134.99 89.2491 135.639 96.8313 135.639 103.635H150.172C150.172 95.9762 149.447 87.7047 148.302 79.3914L133.903 81.3541ZM190.992 60.634C180.359 63.843 160.387 69.4789 139.784 73.2625L142.421 87.483C163.79 83.5588 184.347 77.7505 195.209 74.4722L190.992 60.634ZM139.784 73.2625C127.286 75.5578 114.806 77.1234 104.152 77.1234V91.5841C116.061 91.5841 129.515 89.8536 142.421 87.483L139.784 73.2625ZM135.639 103.635C135.639 113.714 134.217 125.442 132.09 137.279L146.396 139.824C148.597 127.575 150.172 114.912 150.172 103.635H135.639ZM132.09 137.279C127.428 163.223 119.596 188.547 117.279 195.774L131.124 200.17C133.502 192.754 141.564 166.714 146.396 139.824L132.09 137.279ZM196.751 116.696C189.488 119.002 164.037 126.796 137.964 131.434L140.521 145.669C167.546 140.861 193.715 132.839 201.169 130.473L196.751 116.696ZM137.964 131.434C126.068 133.551 114.281 134.966 104.152 134.966V149.427C115.485 149.427 128.211 147.859 140.521 145.669L137.964 131.434ZM104.152 134.966C94.0223 134.966 82.235 133.551 70.3394 131.434L67.7815 145.669C80.0923 147.859 92.8181 149.427 104.152 149.427V134.966ZM70.3394 131.434C44.2655 126.796 18.8148 119.002 11.5523 116.696L7.13463 130.473C14.5878 132.839 40.7581 140.861 67.7815 145.669L70.3394 131.434ZM58.1312 103.635C58.1312 114.912 59.7063 127.575 61.9075 139.824L76.2135 137.279C74.0865 125.442 72.664 113.714 72.664 103.635H58.1312ZM61.9075 139.824C66.7393 166.714 74.8016 192.754 77.1797 200.17L91.0247 195.774C88.7072 188.547 80.8754 163.223 76.2135 137.279L61.9075 139.824ZM77.1797 7.09921C74.4664 15.5603 64.2379 48.6213 60.0015 79.3914L74.3998 81.3541C78.4557 51.8949 88.3516 19.8315 91.0247 11.495L77.1797 7.09921ZM60.0015 79.3914C58.857 87.7047 58.1312 95.9762 58.1312 103.635H72.664C72.664 96.8313 73.3128 89.2491 74.3998 81.3541L60.0015 79.3914ZM104.152 77.1234C93.4972 77.1234 81.0178 75.5578 68.5194 73.2625L65.8818 87.483C78.7882 89.8536 92.2426 91.5841 104.152 91.5841V77.1234ZM68.5194 73.2625C47.9088 69.4776 27.9307 63.8391 17.3005 60.6307L13.0821 74.4687C23.9418 77.7464 44.5053 83.5574 65.8818 87.483L68.5194 73.2625ZM190.543 60.8148C190.672 60.7484 190.825 60.6842 190.992 60.634L195.209 74.4722C195.926 74.2559 196.601 73.9789 197.24 73.6485L190.543 60.8148ZM10.6314 73.3736C11.3843 73.8318 12.2016 74.2029 13.0821 74.4687L17.3005 60.6307C17.6363 60.732 17.946 60.8743 18.2135 61.037L10.6314 73.3736Z"
              fill="#9A85F4"
            />
          </svg>

          <p>Browser Version</p>
          <Link to="/app">
            <button className="tw-bg-spacialPurple tw-p-2 tw-w-32 tw-rounded-full tw-text-white  tw-hover:bg-white tw-hover:text-black tw-transition-all">
              Open
            </button>
          </Link>
        </div>{" "}
        <div className="tw-bg-yellow-400 tw-h-72 tw-w-56 tw-p-8 tw-rounded tw-flex tw-flex-col tw-items-center tw-gap-6">
          <img src="/windows.png" width="96" height="96" />

          <p>Windows App</p>
          <a href="http://test.soft-fire.com:8000/download/TaskelloSetup.exe">
            <button className="tw-bg-spacialPurple tw-p-2 tw-w-32 tw-rounded-full tw-text-white tw-hover:bg-white tw-hover:text-black tw-transition-all">
              Download now
            </button>
          </a>
        </div>{" "}
        <div className="tw-bg-yellow-400 tw-h-72 tw-w-56 tw-p-8 tw-rounded tw-flex tw-flex-col tw-items-center tw-gap-6">
          <img src="/macos.png" width="96" height="96" />

          <p>Mac ios</p>
          <button className="tw-bg-red-500 tw-text-white tw-pointer-events-none tw-p-2 tw-w-32 tw-rounded-full">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <>
      <section class="tw-bg-black">
        <div class="tw-max-w-lg tw-bg-black tw-px-4 tw-pt-24 tw-py-8 tw-mx-auto tw-text-left md:tw-max-w-none md:tw-text-center">
          <h1 class="tw-text-3xl tw-font-extrabold tw-leading-10 tw-tracking-tight tw-text-left tw-text-white tw-text-center sm:tw-leading-none md:tw-text-6xl tw-text-4xl lg:tw-text-7xl">
            <span class="tw-inline md:tw-block">Join Us</span>
            <span class="tw-mt-2 tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-purple-400 tw-via-emerald-400 tw-to-green-500 md:tw-inline-block">
              We are
              <span class="tw-bg-clip-text tw-text-transparent tw-ms-1 tw-bg-gradient-to-r tw-from-teal-500 tw-via-cyon-400 tw-to-purple-300">
                Hiring
              </span>
            </span>
          </h1>
          <div class="tw-mx-auto tw-rounded-lg tw-font-black tw-mt-5 tw-text-zinc-400 md:tw-mt-12 md:tw-max-w-lg tw-text-center lg:tw-text-lg">
            <button class="tw-bg-tkb tw-border tw-text-sm tw-text-white tw-py-3 tw-px-7 tw-rounded-full">
              Learn more
            </button>
          </div>
        </div>
      </section>

      <footer class="tw-bg-black tw-pb-5">
        <div class="tw-max-w-screen-xl tw-px-4 tw-pt-8 tw-mx-auto sm:tw-px-6 lg:tw-px-8">
          <div class="sm:tw-flex sm:tw-items-center sm:tw-justify-between">
            <div class="tw-flex tw-justify-center tw-text-lg tw-text-white sm:tw-justify-start">
              Taskello
            </div>

            <p class="tw-mt-4 tw-text-sm tw-text-center tw-text-gray-400 lg:tw-text-right lg:tw-mt-0">
              T&C &nbsp; Career &nbsp; Privacy & Policy &nbsp; Developers
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
