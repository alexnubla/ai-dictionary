---
title: "All Terms (A-Z)"
layout: default
---

# 🔤 All Terms (A-Z)

Here is a complete, alphabetical list of all terms in the dictionary. 

*(This page updates automatically whenever a new term is added to the `/terms/` folder!)*

<ul>
{% assign term_pages = site.pages | where_exp: "item", "item.path contains 'terms/' and item.name != 'index.md'" | sort: "title" %}
{% for page in term_pages %}
  <li style="margin-bottom: 10px;">
    <a href="{{ site.baseurl }}{{ page.url }}" style="font-size: 1.1em; font-weight: 600;">{{ page.title }}</a> 
    <span style="color: #6a737d;">({{ page.category }})</span>
  </li>
{% endfor %}
</ul>

---
*[← Back to Home]({{ site.baseurl }}/)*
