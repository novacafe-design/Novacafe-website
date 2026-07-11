/* ============================================================
   NOVA CAFE MENU DATA
   ============================================================
   HOW TO EDIT:

   To change a price:    edit the "price" value (just the number)
   For two-size pricing: use "280 / 350" — the renderer will
                         automatically show an "S · L" label above it
   To rename an item:    edit the "name" value
   To remove an item:    delete the entire { } block (including the comma)
   To add an item:       copy an existing { } block and edit
   To add a tag:         set "tag" to "new", "signature", "veg", or "spicy"
                         (or leave it as "" for no tag)
   To mark a hero item:  add  popular: true,
   To change a photo:    swap the URL inside img: "..."
                         (use any Unsplash, Pexels, or your own image URL)

   Categories appear as tabs in the order listed below.
   ============================================================ */

const MENU = [
  {
    id: "coffee-hot",
    label: "Coffee · Hot",
    title: "From the Bar",
    description: "Pulled all day. Where two prices show, it is small or large.",
    extras: "Add cold foam +150 · Non-dairy milk (soy, almond, oat) +120 · Syrup +80 · Sauce +70",
    items: [
      { name: "Espresso",          desc: "A single, slow extraction.",                          price: "200 / 350", tag: "",                       img: "images/menu/espresso.webp" },
      { name: "Cappuccino",        desc: "Soft foam, fine cocoa, an old friend.",               price: "280 / 350", tag: "",                       img: "images/menu/cappuccino.webp" },
      { name: "Latte",             desc: "Long and creamy. Vanilla or caramel.",                price: "300 / 400", tag: "", popular: true,         img: "images/menu/latte.webp" },
      { name: "Spanish Latte",     desc: "Espresso, steamed milk, a thread of condensed milk.", price: "300 / 400", tag: "",                       img: "images/menu/spanish-latte.webp" },
      { name: "Americano",         desc: "Espresso lengthened with hot water.",                 price: "220 / 300", tag: "",                       img: "images/menu/americano.webp" },
      { name: "Hot Chocolate",     desc: "Dark chocolate, steamed milk, a quiet finish.",       price: "350 / 500", tag: "",                       img: "images/menu/hot-chocolate.webp" },
      { name: "Mocha",             desc: "House dark chocolate, espresso, steamed milk.",       price: "250 / 350", tag: "",                       img: "images/menu/mocha.webp" },
      { name: "Karak Tea",         desc: "Black tea, evaporated milk, cardamom, slow simmer.",  price: "250 / 350", tag: "",                       img: "images/menu/karak-tea.webp" }
    ]
  },
  {
    id: "coffee-iced",
    label: "Coffee · Iced",
    title: "Cold & Slow",
    description: "Built over ice for the warm afternoons.",
    extras: "Add cold foam +150 · Non-dairy milk (soy, almond, oat) +120 · Syrup +80 · Sauce +70",
    items: [
      { name: "Iced Latte",         desc: "Double shot, cold milk, ice. Vanilla or caramel.", price: "450", tag: "",                          img: "images/menu/iced-latte.webp" },
      { name: "Iced Spanish Latte", desc: "Sweet, milky, the crowd favourite over ice.",      price: "580", tag: "", popular: true,            img: "images/menu/iced-spanish-latte.webp" },
      { name: "Iced Cappuccino",    desc: "Espresso, cold milk, a soft cap of foam.",         price: "300", tag: "",                          img: "images/menu/iced-cappuccino.webp" },
      { name: "Iced Americano",     desc: "Espresso, cold water, ice. Clean and bright.",     price: "270", tag: "",                          img: "images/menu/iced-americano.webp" },
      { name: "Iced Mocha",         desc: "Dark chocolate, espresso, cold milk over ice.",    price: "400", tag: "",                          img: "images/menu/iced-mocha.webp" },
      { name: "Monte Blanc",        desc: "Iced espresso, cold milk, a cloud of whipped vanilla cream.", price: "700", tag: "",                img: "images/menu/monte-blanc.webp" },
      { name: "Nova Special Latte", desc: "Our signature iced latte, crowned with cold foam.", price: "800", tag: "signature",                img: "images/menu/nova-special-latte.webp" },
      { name: "Vanilla Shake",      desc: "Blended vanilla, cold milk, soft serve finish.",   price: "500", tag: "",                          img: "images/menu/vanilla-shake.webp" },
      { name: "Espresso Shake",     desc: "Espresso blended cold with vanilla cream.",        price: "550", tag: "",                          img: "images/menu/espresso-shake.webp" },
      { name: "Lotus Shake",        desc: "Blended Lotus Biscoff, milk, biscuit crumb.",      price: "550", tag: "",                          img: "images/menu/lotus-shake.webp" },
      { name: "Iced Karak",         desc: "Our cardamom karak, chilled and poured over ice.", price: "650", tag: "",                          img: "images/menu/iced-karak.webp" },
      { name: "Iced Karak + Shot",  desc: "Iced karak laced with a shot of espresso.",        price: "780", tag: "new",                       img: "images/menu/iced-karak-shot.webp" },
      { name: "Karak Krusher",      desc: "Karak, blended to a snow. Cold, spiced, slushy.",  price: "750", tag: "signature",                 img: "images/menu/karak-krusher.webp" }
    ]
  },
  {
    id: "matcha",
    label: "Matcha",
    title: "Stone-Ground, Whisked",
    description: "Ceremonial-grade matcha, whisked to order with cold milk.",
    items: [
      { name: "Vanilla Matcha",      desc: "Matcha, vanilla, cold milk, ice.",                       price: "650", tag: "",                          img: "images/menu/vanilla-matcha.webp" },
      { name: "Caramel Matcha",      desc: "Matcha, salted caramel, cold milk.",                     price: "750", tag: "",                          img: "images/menu/caramel-matcha.webp" },
      { name: "Strawberry Matcha",   desc: "Matcha, fresh strawberry, cold milk.",                   price: "650", tag: "", popular: true,            img: "images/menu/strawberry-matcha.webp" },
      { name: "Blueberry Matcha",    desc: "Matcha, wild blueberry compote, cold milk.",             price: "650", tag: "",                          img: "images/menu/blueberry-matcha.webp" },
      { name: "Nova Special Matcha", desc: "Our matcha, crowned with vanilla cold foam.",            price: "800", tag: "signature",                 img: "images/menu/nova-special-matcha.webp" },
      { name: "Coconut Cloud",       desc: "Matcha, coconut milk, a drift of vanilla cold foam.",   price: "800", tag: "new",                      img: "images/menu/coconut-cloud.webp" }
    ]
  },
  {
    id: "mojitos",
    label: "Mojitos",
    title: "Garden & Glass",
    description: "Built tall with crushed ice, mint, lime, and a long stir.",
    items: [
      { name: "Strawberry Mojito", desc: "Muddled strawberry, mint, lime, soda.",           price: "500", tag: "",                          img: "images/menu/strawberry-mojito.webp" },
      { name: "Passion Mojito",    desc: "Passion fruit, mint, lime, soda.",                price: "500", tag: "",                          img: "images/menu/passion-mojito.webp" },
      { name: "Kiwi Mojito",       desc: "Fresh kiwi, mint, lime, soda.",                   price: "500", tag: "",                          img: "images/menu/kiwi-mojito.webp" },
      { name: "Blueberry Mojito",  desc: "Blueberry, mint, lime, soda.",                    price: "500", tag: "",                          img: "images/menu/blueberry-mojito.webp" },
      { name: "Peach Mojito",      desc: "White peach, mint, lime, soda.",                  price: "500", tag: "",                          img: "images/menu/peach-mojito.webp" },
      { name: "Blue Lagoon",       desc: "Blue curaçao tones, mint, lime, soda.",           price: "500", tag: "",                          img: "images/menu/blue-lagoon.webp" },
      { name: "Classic Mojito",    desc: "Mint, lime, sugar, soda. The original.",          price: "500", tag: "",                          img: "images/menu/classic-mojito.webp" },
      { name: "Mango Mojito",      desc: "Fresh mango, mint, lime, soda.",                  price: "500", tag: "",                          img: "images/menu/mango-mojito.webp" },
      { name: "Nova Select",       desc: "Espresso Mojito, Espresso Tornado, or Americano Honey. Ask the bar.", price: "550", tag: "signature", popular: true, img: "images/menu/nova-select.webp" }
    ]
  },
  {
    id: "snacks",
    label: "Snacks",
    title: "Something to Bite",
    description: "Quick, hot, made to share. Add fries to any plate for 200.",
    items: [
      { name: "Potato Waffles",    desc: "Crisp potato waffle, shredded chicken, melted cheese.",       price: "700", tag: "signature", popular: true, img: "images/menu/potato-waffles.webp" },
      { name: "Nova Burger Wrap",  desc: "Beef or chicken patty, our sauces, rolled in tortilla.",     price: "650", tag: "signature",                 img: "images/menu/nova-burger-wrap.webp" }
    ]
  },
  {
    id: "desserts",
    label: "Desserts",
    title: "The Sweet End",
    description: "Small plates, finished by hand.",
    items: [
      { name: "Tiramisu Balls",         desc: "Mascarpone and espresso-soaked sponge, rolled in cocoa.",   price: "470", tag: "",          img: "images/menu/tiramisu-balls.webp" },
      { name: "Sticky Toffee Pudding",  desc: "Warm date sponge, toffee sauce, soft cream.",               price: "450", tag: "",          img: "images/menu/sticky-toffee.webp" },
      { name: "Fruit Mousse",           desc: "Whipped mousse, seasonal fruit, a light finish.",           price: "380", tag: "",          img: "images/menu/fruit-mousse.webp" },
      { name: "Cheese Bread",           desc: "Two pieces, warm from the oven. Pistachio, chocolate, or Lotus filling.", price: "350", tag: "", img: "images/menu/cheese-bread.webp" }
    ]
  }
];

/* ============================================================
   MENU RENDERER, DO NOT EDIT BELOW
   This reads the MENU array above and builds the menu section.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const tabsEl = document.getElementById("menuTabs");
  const contentEl = document.getElementById("menuContent");
  if (!tabsEl || !contentEl) return;

  // Build tabs
  MENU.forEach((cat, i) => {
    const tab = document.createElement("button");
    tab.className = "menu-tab" + (i === 0 ? " active" : "");
    tab.id = "tab-" + cat.id;
    tab.dataset.target = cat.id;
    tab.textContent = cat.label;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
    tab.setAttribute("aria-controls", "cat-" + cat.id);
    tab.tabIndex = i === 0 ? 0 : -1;
    tabsEl.appendChild(tab);
  });

  // Build categories
  MENU.forEach((cat, i) => {
    const wrap = document.createElement("div");
    wrap.className = "menu-category" + (i === 0 ? " active" : "");
    wrap.id = "cat-" + cat.id;
    wrap.setAttribute("role", "tabpanel");
    wrap.setAttribute("aria-labelledby", "tab-" + cat.id);
    wrap.tabIndex = 0;

    const title = document.createElement("h3");
    title.className = "menu-cat-title";
    title.textContent = cat.title;
    wrap.appendChild(title);

    if (cat.description) {
      const desc = document.createElement("p");
      desc.className = "menu-cat-desc";
      desc.textContent = cat.description;
      wrap.appendChild(desc);
    }

    const grid = document.createElement("div");
    grid.className = "menu-items";

    cat.items.forEach(item => {
      const el = document.createElement("div");
      el.className = "menu-item";

      const tagLabel = {
        new: "New",
        signature: "Signature",
        veg: "Veg",
        spicy: "Spicy"
      };
      const tagHtml = item.tag && tagLabel[item.tag]
        ? `<span class="menu-item-tag ${item.tag}">${tagLabel[item.tag]}</span>`
        : "";

      const popularHtml = item.popular
        ? `<span class="menu-item-popular">★ Popular</span>`
        : "";

      const imgHtml = item.img
        ? `<div class="menu-item-img">${popularHtml}<img src="${item.img}" alt="${item.name}" loading="lazy" decoding="async" width="300" height="225" onerror="this.parentElement.classList.add('img-fallback');this.parentElement.dataset.letter='${item.name.charAt(0)}';this.remove();" /></div>`
        : `<div class="menu-item-img img-fallback" data-letter="${item.name.charAt(0)}">${popularHtml}</div>`;

      // Two-size pricing: detect "200 / 350" style and label it
      const isTwoSize = /^\s*\d[\d,]*\s*\/\s*\d[\d,]*\s*$/.test(item.price);
      const priceHtml = isTwoSize
        ? `<span class="menu-item-sizes">S · L</span><span class="menu-item-price">KES ${item.price}</span>`
        : `<span class="menu-item-price">KES ${item.price}</span>`;

      el.innerHTML = `
        ${imgHtml}
        <div class="menu-item-body">
          <div class="menu-item-name">${item.name} ${tagHtml}</div>
          <p class="menu-item-desc">${item.desc}</p>
          <div class="menu-item-footer">
            ${priceHtml}
          </div>
        </div>
      `;
      grid.appendChild(el);
    });

    wrap.appendChild(grid);

    if (cat.extras) {
      const extras = document.createElement("p");
      extras.className = "menu-cat-extras";
      extras.textContent = cat.extras;
      wrap.appendChild(extras);
    }

    contentEl.appendChild(wrap);
  });

  // Tab switching (keeps class state, ARIA state, and roving tabindex in sync)
  function activateTab(tab) {
    tabsEl.querySelectorAll(".menu-tab").forEach(t => {
      const selected = t === tab;
      t.classList.toggle("active", selected);
      t.setAttribute("aria-selected", selected ? "true" : "false");
      t.tabIndex = selected ? 0 : -1;
    });
    document.querySelectorAll(".menu-category").forEach(c => c.classList.remove("active"));
    document.getElementById("cat-" + tab.dataset.target).classList.add("active");
    // Keep the active tab visible in the scrollable strip on mobile
    tab.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }

  tabsEl.addEventListener("click", e => {
    const tab = e.target.closest(".menu-tab");
    if (tab) activateTab(tab);
  });

  // Arrow-key navigation between tabs
  tabsEl.addEventListener("keydown", e => {
    const tabs = [...tabsEl.querySelectorAll(".menu-tab")];
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;
    let next = null;
    if (e.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    tabs[next].focus();
    activateTab(tabs[next]);
  });
});
