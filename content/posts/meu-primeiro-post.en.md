title: How this blog (almost) created itself
date: 2026-05-25
lang: en
description: What's necessary to have a simple blog using Python, coffee, and stubbornness.
tags: [python, dev, good-old-hacks]

# The birth of a blog (or: Why didn't I use WordPress?)

If you're reading this, congratulations! It means the tangle of Python scripts I call a "build system" actually worked and didn't blow up my computer.

Many people would ask: *"Renaldo, why on earth didn't you use WordPress or Medium?"*. The answer is simple: because I like to suffer (and to have total control over every pixel and every line of code). 

Here's the recipe for what makes this blog run while I drink my coffee:

### The Holy Trinity of my Setup:

1.  **Flask + Flask-FlatPages:** 
    Flask is like that Swiss Army knife I use for everything. FlatPages is the magic that takes dull Markdown files and turns them into elegant HTML pages. No database, no complication, no drama.
    
2.  **Markdown:** 
    I write in plain text, Python does the heavy lifting, and the result is clean HTML. It's the closest thing to "programming" text I know.

3.  **Frozen-Flask:** 
    This one is the genie in the lamp. It takes all the dynamism of Flask and "freezes" it into static files. The result? A site that flies, is secure by nature, and lives for free on GitHub Pages.

### The "Master Chef" behind it all
The real hero here is **GitHub Actions**. Every time I `git push` a new post, a robot somewhere in the world wakes up, runs my Python scripts, cleans up the mess, and publishes the site. I only need to worry about writing (and not letting the coffee get cold).

### Code example (because a dev blog must have code):

Just to make sure the syntax highlighting is working and looking great:

```python
def morning_routine(coffee_available: bool):
    if coffee_available:
        print("☕ Starting blog deploy...")
        return "World conquered!"
    else:
        raise Exception("Critical Error: Caffeine not found.")

# Spoiler: coffee is always available.
```

I hope you enjoy the next posts. Soon I will talk about Linux, Homelab, Open Source, and other geeky stuff.

See you next time!
