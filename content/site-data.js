window.PORTFOLIO_DATA = {
  site: {
    name: "Example Builder",
    role: "Developer Advocate",
    kicker: "Demos, writing, and talks",
    headline: "I turn rough technical work into useful public artifacts.",
    summary:
      "Use this portfolio as a starting point for projects, field notes, talks, and custom sections. Replace the example data with your own work.",
    avatar: "assets/img/avatar-placeholder.svg",
    primaryCta: {
      label: "Read the latest",
      href: "blog/"
    },
    secondaryCta: {
      label: "View projects",
      href: "projects/"
    },
    footerNote: "Built from a static portfolio template. Replace this with your own note."
  },

  nav: [
    { label: "Home", href: "index.html" },
    { label: "Blog", href: "blog/" },
    { label: "Projects", href: "projects/" },
    { label: "Talks", href: "talks/" },
    { label: "Sections", href: "sections/" }
  ],

  social: [
    { label: "GitHub", href: "https://github.com/example" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/example" },
    { label: "Email", href: "mailto:hello@example.com" }
  ],

  proofPoints: [
    { label: "Projects", value: "3" },
    { label: "Field Notes", value: "4" },
    { label: "Talks", value: "2" }
  ],

  landingCards: [
    {
      title: "Agent Notes Starter",
      eyebrow: "Writing",
      description: "A short example post about turning messy debugging notes into useful public writing.",
      href: "blog/getting-started-with-agent-notes/",
      tags: ["notes", "writing"]
    },
    {
      title: "Demo Lab",
      eyebrow: "Projects",
      description: "A place to collect prototypes, screenshots, repo links, and the lesson behind each build.",
      href: "projects/",
      tags: ["projects", "demos"]
    },
    {
      title: "Talk Backlog",
      eyebrow: "Speaking",
      description: "A simple page for talk ideas, accepted sessions, recordings, and rehearsal notes.",
      href: "talks/",
      tags: ["talks", "events"]
    }
  ],

  projects: [
    {
      title: "Demo Lab",
      description: "A fake project for collecting small technical demos before they become posts or talks.",
      href: "https://github.com/example/demo-lab",
      status: "Example",
      tags: ["static site", "docs"]
    },
    {
      title: "Trace Notes",
      description: "A fake notebook that turns errors, screenshots, and decisions into searchable notes.",
      href: "https://github.com/example/trace-notes",
      status: "Prototype",
      tags: ["debugging", "notes"]
    },
    {
      title: "Workshop Kit",
      description: "A fake starter kit for turning a live demo into a repeatable workshop.",
      href: "https://github.com/example/workshop-kit",
      status: "Draft",
      tags: ["talks", "teaching"]
    }
  ],

  talks: [
    {
      title: "From Scratchpad To System",
      event: "Example Conf",
      date: "2026-09-15",
      description: "How to turn one messy build into a repeatable lesson, demo, and article.",
      href: "talks/",
      tags: ["workflow", "writing"]
    },
    {
      title: "The Demo Is The Spec",
      event: "Local Developer Meetup",
      date: "2026-11-04",
      description: "A practical talk about using demos to discover unclear docs, product gaps, and missing examples.",
      href: "talks/",
      tags: ["demos", "developer experience"]
    }
  ],

  blogPosts: [
    {
      title: "Getting Started With Agent Notes",
      slug: "getting-started-with-agent-notes",
      date: "2026-01-12",
      summary: "A fake example post that shows the default blog layout and content model.",
      href: "blog/getting-started-with-agent-notes/",
      tags: ["template", "notes"]
    },
    {
      title: "What Belongs On A Project Card",
      slug: "project-card-example",
      date: "2026-02-03",
      summary: "A placeholder entry showing how short writing can link to a future post.",
      href: "blog/",
      tags: ["projects", "portfolio"]
    },
    {
      title: "A Better Talk Backlog",
      slug: "talk-backlog-example",
      date: "2026-03-21",
      summary: "A placeholder entry for turning talk ideas into public artifacts.",
      href: "blog/",
      tags: ["talks", "process"]
    }
  ],

  sections: [
    {
      title: "Now",
      description: "Use this section for current focus areas, open questions, or active experiments.",
      items: [
        "Replace this with what you are building this month.",
        "Add the topic you are writing about next.",
        "Link the talk, demo, or case study you want people to notice."
      ]
    },
    {
      title: "Working Rules",
      description: "Use this section to show how you approach work.",
      items: [
        "Start from the real build.",
        "Show the tradeoff.",
        "Keep the lesson practical."
      ]
    }
  ]
};
