title: "Dusting Off: How I Published My Portfolio Using Porkbun and GitHub"
date: 2026-07-20
lang: en
description: A light and simple guide on how to register your domain and put your site online for free.
tags: [web, dev, tutorial]

### The bits are accumulating, I know

If the frequency of posts on this blog were an electrocardiogram, the doctor would have already signed my death certificate. Yes, it's been a while since I published anything here, but today I want to share a bit of the behind-the-scenes of how this site got out of my local machine and onto the web under the domain **renaldofreire.dev**. And the best part? It costs less than two cups of coffee a year.

---

### The Engine: Flask and Markdown

Before talking about how the site was published, it's worth understanding what it is made of. I could have used WordPress, but since I like to understand where every single screw fits, I decided to use **Flask** (a micro-framework in Python) and **Markdown** (a simple way of writing text that Python converts to HTML).

To put this on the internet quickly and securely, I used **Frozen-Flask**. It runs on my machine, reads all the dynamic code, and "freezes" the site, outputting only static HTML, CSS, and JS files. The result? An extremely lightweight site, with no database to worry about, and virtually immune to common security vulnerabilities.

---

### The Free Garage: GitHub Pages

After "freezing" the site, I needed a place to park it. That's where **GitHub** comes in.

Besides being the platform where we store code, GitHub has a service called **GitHub Pages**. Think of it as a free hosting space for static sites. I simply send the compiled files there, and GitHub takes care of serving them to the world.

But uploading these files manually every time would be a chore. So, I set up **GitHub Actions** — which works like a virtual assistant. Every time I write a new post (like this one) and push the code (`git push`), this assistant wakes up, runs the Python scripts to build the site, and publishes the new version online in seconds.

---

### A Real Address: Porkbun and DNS

Having the site on GitHub is great, but the default address would be something plain like *renaldofreire.github.io*. I wanted something with more personality.

To solve this, I bought the domain **renaldofreire.dev** from **Porkbun** (a domain registrar highly popular in the dev community, famous for honest prices and a cute pig mascot).

After buying the domain, the magic happens in the **DNS** settings (which works like the phonebook of the internet):
1. In the Porkbun panel, I pointed the domain to GitHub's servers.
2. On GitHub, I created a file called `CNAME` saying: *"Hey, when someone types renaldofreire.dev, show my page!"*.

Everything connects beautifully. The domain directs visitors to GitHub Pages, which in turn delivers the static site generated automatically by Python.

---

### Conclusion

Putting a website online today doesn't have to involve expensive servers or scary network configurations. With a combination of static tools, GitHub Pages for free hosting, and a cheap domain from Porkbun, you can have your own space on the internet with total control.

I promise the next post won't take this long to come out.

See you next time, hopefully with a fresh cup of coffee nearby!
