import { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import TypewriterComponent from "typewriter-effect";
import { useSession, signOut } from "next-auth/react";

import About from "@/components/about";
import Contact from "@/components/contact";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("header nav a");
    console.log(navLinks);

    window.onscroll = () => {
      sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
          navLinks.forEach((links) => {
            links.classList.remove("active");
            document
              .querySelector("header nav a[href*=" + id + "]")
              .classList.add("active");
          });
        }
      });
    };
    // Import ScrollReveal dynamically and create an instance when it's available
    import("scrollreveal")
      .then((module) => {
        const ScrollReveal = module.default;
        if (ScrollReveal) {
          const sr = new ScrollReveal({
            reset: true,
            distance: "80px",
            duration: 2000,
            delay: 200,
          });

          // Floating animation
          sr.reveal(".homeContent, .heading", { origin: "top" });
          sr.reveal(".about-img, .home-img, .contact form", {
            origin: "bottom",
          });
          sr.reveal(".homeContent h1, .about-content p", {
            origin: "left",
          });
          sr.reveal(".about-content, .homeContent h3", {
            origin: "right",
          });
        }
      })
      .catch((error) => {
        console.error("Error importing ScrollReveal:", error);
      });
  }, []);

  console.log(session);
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <title>Talkgenius | AI Powered Chatbot</title>
      </Head>

      <header className="header">
        <Link className="logo cursor-pointer" href="/">
          T<span>a</span>lkGen<span>i</span>us
        </Link>
        <nav className="navbar">
          <Link className="active" href="#home">
            Home
          </Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
          {session ? (
            <button className="btnLogin-popup" onClick={() => signOut()}>
              Logout
            </button>
          ) : (
            <Link className="btnLogin-popup" href={"/login"}>
              Login
            </Link>
          )}
        </nav>
      </header>
      <section className="section" id="home">
        <div className="homeContent">
          <h3>Hello, It&apos;s me</h3>
          <h1>AI based Chat Bot</h1>
          <div className="flex items-center gap-4">
            <h3>And I can </h3>
            <h3>
              <TypewriterComponent
                className="inline-block w-fit"
                options={{
                  strings: [
                    "Answer Any Query",
                    "Write Content",
                    "Tell Stories",
                    "Write Code",
                    "Write letters",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              ></TypewriterComponent>
            </h3>
          </div>
          <Link href={session ? "/chat" : "/login"} className="link-cta">
            {session ? "Let\u0027s chat \u2192" : "Let\u0027s start \u2192"}
          </Link>
        </div>
        <div className="home-img">
          <img src="/img/bot.png" alt="bot" />
        </div>
      </section>
      <About />
      <Contact />
    </>
  );
}
