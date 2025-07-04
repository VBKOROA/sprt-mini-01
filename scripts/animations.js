document.addEventListener("DOMContentLoaded", () => {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Custom Cursor Animation
        const cursor = document.querySelector(".custom-cursor");
        const cursorDot = cursor.querySelector(".cursor-dot");
        const cursorOutline = cursor.querySelector(".cursor-outline");

        window.addEventListener("mousemove", (e) => {
          const { clientX: x, clientY: y } = e;
          gsap.to(cursor, {
            x: x,
            y: y,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        document.querySelectorAll("a, .team-member-card").forEach((el) => {
          el.addEventListener("mouseenter", () =>
            cursor.classList.add("hover")
          );
          el.addEventListener("mouseleave", () =>
            cursor.classList.remove("hover")
          );
        });

        // 2. Hero Section Animation
        const hero = document.querySelector(".hero");
        const mainTitle = document.querySelector(".main-title");
        const text = mainTitle.textContent;
        mainTitle.innerHTML = ""; // Clear original text

        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.className = "char";
          span.style.display = "inline-block";
          span.textContent = char;
          if (char === " ") span.style.width = "1rem";
          mainTitle.appendChild(span);
        });

        const chars = mainTitle.querySelectorAll(".char");

        gsap.set(chars, { y: 115 });
        gsap.set(".subtitle", { opacity: 0, y: 20 });

        gsap
          .timeline({ delay: 0.2 })
          .to(".navbar", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          })
          .to(
            chars,
            {
              y: 0,
              stagger: 0.03,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.8"
          )
          .to(
            ".subtitle",
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5"
          );

        // Hero Parallax Effect
        hero.addEventListener("mousemove", (e) => {
          const { clientX, clientY } = e;
          const xPercent = (clientX / window.innerWidth - 0.5) * 2;
          const yPercent = (clientY / window.innerHeight - 0.5) * 2;

          gsap.to(chars, {
            x: (i) => i * 2 * xPercent,
            y: (i) => i * 1.5 * yPercent,
            rotateY: 10 * xPercent,
            ease: "power1.out",
            duration: 0.5,
            stagger: 0.01,
          });
        });

        // 3. Scroll-triggered Animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#team-members",
            start: "top 80%",
            end: "bottom top",
          },
        });

        tl.to(".section-title", {
          opacity: 1,
          y: -20,
          duration: 0.8,
          ease: "power3.out",
        }).from(
          ".team-member-card",
          {
            opacity: 0,
            y: 100,
            rotation: -5,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );

        // 4. 3D Card Tilt Effect
        const cards = document.querySelectorAll(".team-member-card");
        cards.forEach((cardWrapper) => {
          const card = cardWrapper.querySelector(".card");
          const intensity = 15; // 기울기 강도

          cardWrapper.addEventListener("mousemove", (e) => {
            const rect = cardWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = (y / rect.height - 0.5) * -intensity;
            const rotateY = (x / rect.width - 0.5) * intensity;

            gsap.to(card, {
              rotationX: rotateX,
              rotationY: rotateY,
              scale: 1.05,
              ease: "power2.out",
              duration: 0.4,
            });
          });

          cardWrapper.addEventListener("mouseleave", () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              ease: "elastic.out(1, 0.3)",
              duration: 1,
            });
          });
        });

        // 5. Dynamic Modal Animation
        document.querySelectorAll(".modal").forEach((modal) => {
          modal.addEventListener("show.bs.modal", (event) => {
            const modalDialog = event.target.querySelector(".modal-dialog");
            const profileImg = event.target.querySelector(".profile-img");
            const title = event.target.querySelector("h2");
            const listItems = event.target.querySelectorAll(".list-group-item");
            const subHeading = event.target.querySelector("h4");
            const paragraph = event.target.querySelector("p:last-of-type");

            gsap.set(modalDialog, { y: -50, opacity: 0 });
            gsap.set([profileImg, title, listItems, subHeading, paragraph], {
              opacity: 0,
              y: 20,
            });

            const tl = gsap.timeline();
            tl.to(modalDialog, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
            })
              .to(
                [profileImg, title],
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.1,
                  duration: 0.4,
                  ease: "power2.out",
                },
                "-=0.2"
              )
              .to(
                listItems,
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.08,
                  duration: 0.3,
                  ease: "power2.out",
                },
                "-=0.2"
              )
              .to(
                [subHeading, paragraph],
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.1,
                  duration: 0.4,
                  ease: "power2.out",
                },
                "-=0.2"
              );
          });
        });

        // 6. Footer Animation
        gsap.to(".footer", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer",
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });