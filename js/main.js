(function () {
  "use strict";

  var professionalProjects = [
    {
      name: "Novo Portal da Transparência",
      url: "https://portal.transparencia.maceio.al.gov.br/portal/#/home",
      description: "New transparency portal from the Maceió City Government, allowing citizens to consult public information about the municipality.",
      label: "Maceió City Hall"
    },
    {
      name: "App do Servidor",
      description: "An app for Maceió City Hall employees to access their information and using the electronic timekeeping by mobile phone.",
      label: "Maceió City Hall"
    },
    {
      name: "Ponto Eletrônico",
      description: "Electronic time and attendance management system, used by the HR department of the Maceió City Government.",
      label: "Maceió City Hall"
    },
    {
      name: "Ehosp",
      description: "Outpatient care system that queries the SUS API to generate an export of the BPA (Outpatient Production Report).",
      label: "Health"
    }
  ];

  var projectsGithub = [
    {
      name: "PersonAPI",
      url: "https://github.com/ManoelH/PersonAPI",
      description: "REST API built with Java 11, Spring Boot, JPA, and Maven to manage CRUD operations for people.",
      label: "Java"
    },
    {
      name: "Star-Wars-API",
      url: "https://github.com/ManoelH/Star-Wars-API",
      description: "API created for practicing automated testing.",
      label: "Java"
    },
    {
      name: "CRUDJSF",
      url: "https://github.com/ManoelH/CRUDJSF",
      description: "CRUD in a JSF project to showcase my skills with the framework.",
      label: "Java"
    },
    {
      name: "pipeline-games-airflow",
      url: "https://github.com/ManoelH/pipeline-games-airflow",
      description: "A postgraduate project that analyzes two game datasets and returns the 64 highest-rated games from 2019.",
      label: "Python"
    },
    {
      name: "Task",
      url: "https://github.com/ManoelH/Task",
      description: "An application for recording tasks, featuring login via Firebase authentication and a Cloud Firestore database.",
      label: "Kotlin"
    },
    {
      name: "Cores",
      url: "https://github.com/ManoelH/Cores",
      description: "An application that fetches colors from an API and displays them dynamically.",
      label: "Kotlin"
    }
  ];

  function createCard(project) {
    var card = document.createElement(project.url ? "a" : "article");
    card.className = "card";
    if (project.url) {
      card.href = project.url;
      card.target = "_blank";
      card.rel = "noopener";
    }

    var title = document.createElement("h4");
    title.textContent = project.name;

    var text = document.createElement("p");
    text.textContent = project.description;

    var label = document.createElement("span");
    label.className = "label";
    label.textContent = project.label;

    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(label);
    return card;
  }

  function render(idContainer, lista) {
    var container = document.getElementById(idContainer);
    if (!container) return;
    lista.forEach(function (project) {
      container.appendChild(createCard(project));
    });
  }

  render("professionalProjects", professionalProjects);
  render("projectsGithub", projectsGithub);

  // Phone Menu 
  var botao = document.getElementById("menuBtn");
  var menu = document.getElementById("menu");
  if (botao && menu) {
    botao.addEventListener("click", function () {
      var opened = menu.classList.toggle("opened");
      botao.setAttribute("aria-expanded", String(opened));
    });
    menu.addEventListener("click", function (evento) {
      if (evento.target.tagName === "A") {
        menu.classList.remove("opened");
        botao.setAttribute("aria-expanded", "false");
      }
    });
  }


  var links = Array.prototype.slice.call(document.querySelectorAll(".menu a"));
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (items) {
      items.forEach(function (item) {
        if (item.isIntersecting) {
          links.forEach(function (link) {
            link.classList.toggle("ativo", link.getAttribute("href") === "#" + item.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    links.forEach(function (link) {
      var secao = document.querySelector(link.getAttribute("href"));
      if (secao) observer.observe(secao);
    });
  }

  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
