import { useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import meter1 from "../../assets/img/java.png";
import meter2 from "../../assets/img/python.png";
import meter3 from "../../assets/img/react.png";
import meter4 from "../../assets/img/angular.png";
import meter5 from "../../assets/img/myql.png";
import meter6 from "../../assets/img/mongodb.png";
import meter7 from "../../assets/img/gooo.png";
//import colorSharp from "../../assets/img/color-sharp.png";
import "../../color/skills/Habilidades.css";

export const Skills = () => {
  const itemsRef = useRef([]);
  const handleTouchStart = (item) => {
    item.classList.add("touched");
    setTimeout(() => {
      item.classList.remove("touched");
    }, 1000);
  };

  useEffect(() => {
    const items = itemsRef.current;
    items.forEach((item) => {
      item.addEventListener("touchstart", () => handleTouchStart(item));
    });
    return () => {
      items.forEach((item) => {
        item.removeEventListener("touchstart", () => handleTouchStart(item));
      });
    };
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const skillsText = {
    title: "Tecnologías",
  };

  const skillsItems = [
    { img: meter1, alt: "Java", name: "JAVA" },
    { img: meter2, alt: "Python", name: "PYTHON" },
    { img: meter3, alt: "React", name: "REACT" },
    { img: meter4, alt: "Angular", name: "ANGULAR" },
    { img: meter5, alt: "MySQL", name: "MYSQL" },
    { img: meter6, alt: "Mongodb", name: "MONGODB" },
    { img: meter7, alt: "GO", name: "GO" },
  ];

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>{skillsText.title}</h2>
              {/*<p>Mi experiencia en mis practicas abarca una amplia variedad de tecnologías y herramientas de desarrollo. He trabajado con lenguajes de programación como <strong>Java</strong>, <strong>Python</strong>, y <strong>React</strong> ..<strong> y mas</strong>, así como en la creación de aplicaciones móviles con <strong>C#</strong> y <strong>Unity</strong>. Mi enfoque está en crear soluciones innovadoras y de alto rendimiento para proyectos de software de cualquier escala.</p> */}
              <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                {skillsItems.map((skill, index) => (
                  <div className="item" key={index} ref={(el) => (itemsRef.current[index] = el)}>
                    <img src={skill.img} alt={skill.alt} />
                    <h5>{skill.name}</h5>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      {/*<img className="background-image-left" src={colorSharp} alt="Background" />*/}
    </section>
  );
};
