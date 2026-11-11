(function () {
  "use strict";

  var professionalProjects = [
    {
      name: "Novo Portal da Transparência",
      url: "https://portal.transparencia.maceio.al.gov.br/portal/#/home",
      description: "New transparency portal from the Maceió City Government, allowing citizens to consult public information about the municipality. "+
      "The project was evaluated by Atricon (Associação dos Membros dos Tribunais de Contas do Brasil) with a score of 87,9% in 2026.",
      label: "Maceió City Hall",
      label2: "Images",
      images: [
        "assets/img/avaliacao-portal-maceio.jpeg",
        "assets/img/grafico.jpeg",
      ]
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
    

    var title = document.createElement("h4");
    title.textContent = project.name;

    var text = document.createElement("p");
    text.textContent = project.description;

    var label = document.createElement(project.url ? "a" : "span");
    label.className = "label";
    label.textContent = project.label;
    
    if (project.url) {
      label.href = project.url;
      label.target = "_blank";
      label.rel = "noopener";
    }

    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(label);

 
    if (project.label2) {
      var label2 = document.createElement("a");
      label2.className = "label";
      label2.textContent = project.label2;
      label2.href = "#";

      if (project.label2 === "Images" && project.images?.length) {
          label2.addEventListener("click", (event) => {
          event.preventDefault();
          openProjectImages(project.images);
        });
      }

      card.appendChild(label2);
    }


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



function openProjectImages(images) {
  // Cria o dialog apenas uma vez
  var dialog = document.getElementById("projectImagesDialog");

  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "projectImagesDialog";
    dialog.className = "project-dialog";

    dialog.innerHTML = `
      <div class="dialog-header">
        <h2>Atricon: Novo Portal da Transparência Maceió</h2>
        <button class="dialog-close" aria-label="Close">&times;</button>
      </div>
      <div class="dialog-gallery"></div>
    `;

    document.body.appendChild(dialog);

    dialog.querySelector(".dialog-close").addEventListener("click", () => {
      dialog.close();
    });

    // Fecha ao clicar fora do conteúdo
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }

  // Monta a galeria
  var gallery = dialog.querySelector(".dialog-gallery");
  gallery.innerHTML = "";

  
  images.forEach((src, index) => {
    var wrapper = document.createElement("div");
    wrapper.className = "image-zoom-container";

    var img = document.createElement("img");
    img.src = src;
    img.alt = `Project image ${index + 1}`;
    img.loading = "lazy";
    img.draggable = false;

    wrapper.appendChild(img);
    gallery.appendChild(wrapper);

    enableImageZoom(wrapper, img);
  });


  dialog.showModal();
}


function enableImageZoom(container, img) {
  var scale = 1;
  var x = 0;
  var y = 0;

  var pointers = new Map();

  var startScale = 1;
  var startX = 0;
  var startY = 0;
  var startDistance = 0;
  var startMidpoint = null;
  var startPointer = null;

  function updateTransform() {
    img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  function resetZoom() {
    scale = 1;
    x = 0;
    y = 0;
    updateTransform();
  }

  function clamp(value) {
    return Math.min(Math.max(value, 1), 4);
  }

  function getDistance(p1, p2) {
    return Math.hypot(
      p1.x - p2.x,
      p1.y - p2.y
    );
  }

  function getMidpoint(p1, p2) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2
    };
  }

  // Zoom com scroll do mouse
  container.addEventListener("wheel", function(event) {
    event.preventDefault();

    var oldScale = scale;
    var newScale = clamp(
      scale * (event.deltaY < 0 ? 1.15 : 1 / 1.15)
    );

    if (newScale === oldScale) return;

    var rect = img.getBoundingClientRect();

    var localX = (
      event.clientX - (rect.left + rect.width / 2)
    ) / oldScale;

    var localY = (
      event.clientY - (rect.top + rect.height / 2)
    ) / oldScale;

    x += localX * (oldScale - newScale);
    y += localY * (oldScale - newScale);

    scale = newScale;
    updateTransform();
  }, { passive: false });

  // Controle de toque e arraste
  container.addEventListener("pointerdown", function(event) {
    event.preventDefault();

    container.setPointerCapture(event.pointerId);

    pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });

    startScale = scale;
    startX = x;
    startY = y;

    if (pointers.size === 1) {
      startPointer = {
        x: event.clientX,
        y: event.clientY
      };
    }

    if (pointers.size === 2) {
      var pts = Array.from(pointers.values());

      startDistance = getDistance(pts[0], pts[1]);
      startMidpoint = getMidpoint(pts[0], pts[1]);
    }
  });

  container.addEventListener("pointermove", function(event) {
    if (!pointers.has(event.pointerId)) return;

    pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });

    if (pointers.size === 2) {
      var pts = Array.from(pointers.values());

      var distance = getDistance(pts[0], pts[1]);
      var midpoint = getMidpoint(pts[0], pts[1]);

      scale = clamp(
        startScale * distance / startDistance
      );

      x = startX + midpoint.x - startMidpoint.x;
      y = startY + midpoint.y - startMidpoint.y;

      updateTransform();

    } else if (pointers.size === 1 && scale > 1) {
      x = startX + event.clientX - startPointer.x;
      y = startY + event.clientY - startPointer.y;

      updateTransform();
    }
  });

  function releasePointer(event) {
    pointers.delete(event.pointerId);

    if (pointers.size === 1) {
      var remaining = Array.from(pointers.values())[0];

      startPointer = {
        x: remaining.x,
        y: remaining.y
      };

      startX = x;
      startY = y;
    }
  }

  container.addEventListener("pointerup", releasePointer);
  container.addEventListener("pointercancel", releasePointer);

  // Duplo clique restaura o tamanho original
  container.addEventListener("dblclick", resetZoom);
}

