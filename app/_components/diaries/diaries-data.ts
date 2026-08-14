/**
 * The Hand Made Diaries — blog posts, now served as internal article pages.
 * Titles, excerpts, images, and body copy were migrated from the published Wix
 * blog (https://www.thehandmadestore.co.in/the-handmade-diaries). Each post has
 * a clean internal `slug` and a structured `body` rendered by the article route
 * at app/the-handmade-diaries/[slug]/page.tsx.
 *
 * Images are served from Wix's media CDN (already allowed in next.config.ts).
 * Only the media id (before `/v1/…`) is significant — the trailing filename is
 * cosmetic.
 */
const wixImage = (mediaId: string) =>
  `https://static.wixstatic.com/media/${mediaId}/v1/fill/w_1600,h_1067,al_c,q_85,enc_avif,quality_auto/diary.jpg`;

export type DiaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string };

export type DiaryPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: DiaryBlock[];
};

const p = (text: string): DiaryBlock => ({ type: "paragraph", text });
const h = (text: string): DiaryBlock => ({ type: "heading", text });

export const DIARY_POSTS: DiaryPost[] = [
  {
    slug: "the-art-of-sustainable-gifting",
    title: "The Art of Sustainable Gifting: Tips for Businesses and Individuals",
    excerpt:
      "Sustainable gifting is not just a trend; it's a mindful approach that benefits both the recipient and the planet.",
    image: wixImage("dc7de4_c3ba33a36fc84c8fafe630595b7c6b2a~mv2.jpg"),
    imageAlt: "A sustainable gift hamper laid out with its contents",
    body: [
      p("Gifting is a cherished tradition that allows us to express our appreciation, strengthen relationships, and create lasting memories. However, in today's world, where environmental concerns are at the forefront, it's essential to consider the impact of our gifting choices. Sustainable gifting is not just a trend; it's a mindful approach that benefits both the recipient and the planet."),
      p("At THS, we believe in the power of sustainable gifting, and we've learned a thing or two about how to make it work for both businesses and individuals. In this blog post, we'll share our top tips for mastering the art of sustainable gifting."),
      h("1. Choose Gifts with a Story"),
      p("One of the key elements of sustainable gifting is choosing items that have a story behind them. Whether it's a handcrafted product made by skilled artisans or a piece that incorporates eco-friendly materials, a gift with a story adds depth and meaning to the act of giving."),
      p("When selecting gifts for your business partners or loved ones, take the time to research the origin and impact of the products. Opt for items that support local communities, preserve traditional crafts, or contribute to environmental conservation efforts."),
      h("2. Prioritize Quality and Durability"),
      p("In the world of sustainable gifting, quality trumps quantity. Instead of opting for cheap, disposable items that end up in landfills, invest in gifts that are built to last. High-quality, durable products not only show the recipient that you value them, but they also reduce waste in the long run."),
      p("When evaluating potential gifts, consider the materials used, the craftsmanship, and the overall longevity of the item. Look for products that come with warranties or guarantees, as this is often a sign of a company's confidence in their offering."),
      h("3. Consider the Packaging"),
      p("Sustainable gifting doesn't stop at the gift itself; it also extends to the packaging. Traditional gift wrapping often involves single-use materials like plastic ribbons, glossy paper, and foam padding, all of which contribute to environmental waste."),
      p("To make your gifting more sustainable, consider alternative packaging options. Opt for reusable gift bags, recyclable paper, or even fabric wraps that can be repurposed. If you're feeling creative, try using materials like old maps, sheet music, or magazine pages to create unique, eco-friendly gift wrap."),
      h("4. Give Experiences, Not Just Things"),
      p("Sometimes, the most meaningful gifts are not tangible items, but experiences. Giving an experience, such as a cooking class, a nature hike, or a museum membership, not only creates lasting memories but also minimizes the environmental impact of physical products."),
      p("When choosing experiential gifts, consider the recipient's interests and values. Look for experiences that align with their passions and contribute to their personal growth or well-being."),
      h("5. Support Local and Small Businesses"),
      p("Sustainable gifting is not just about what you give, but also about who you support. When possible, choose to purchase gifts from local and small businesses that prioritize sustainability and ethical practices."),
      p("Supporting these businesses not only helps to reduce the carbon footprint associated with transportation and shipping but also strengthens local economies and communities. Plus, you'll often find unique, one-of-a-kind items that you won't see in big-box stores."),
      h("6. Communicate Your Values"),
      p("Finally, don't be afraid to communicate your commitment to sustainable gifting. Whether you're a business looking to align your gifting practices with your corporate values or an individual hoping to inspire change, sharing your motivation behind choosing sustainable gifts can have a ripple effect."),
      p("Consider including a note with your gift that explains the story behind the item or the impact of your purchase. Share your experiences with sustainable gifting on social media or in conversations with friends and family. By spreading the word, you can help to normalize sustainable gifting and encourage others to make more mindful choices."),
      h("7. The Gift of a Greener Future"),
      p("At THS, we believe that sustainable gifting is not just a choice, but a responsibility. By being intentional about the gifts we give and the businesses we support, we have the power to create a positive impact on both the people and the planet."),
      p("We hope that these tips have inspired you to embrace the art of sustainable gifting in your own life and work. Whether you're a business looking to make a difference or an individual hoping to live more mindfully, remember that every gift has the potential to tell a story and contribute to a greener future."),
      p("So go ahead, give with purpose, and watch as your gifts create ripples of positive change in the world around you."),
    ],
  },
  {
    slug: "modernizing-heritage",
    title:
      "Modernizing Heritage: How We Bring Traditional Crafts to the Corporate World",
    excerpt:
      "From the intricate embroidery of the North to the vibrant weaves of the South, these crafts are a testament to the skill of India's artisans and a reflection of the country's diverse cultural tapestry.",
    image: wixImage("dc7de4_6df1d6c0c97a4b25989b9b218db68af9~mv2.jpg"),
    imageAlt: "An artisan at work on a traditional Indian craft",
    body: [
      p("India is a land of rich cultural heritage, with a long and proud history of traditional crafts that have been passed down through generations. From the intricate embroidery of the North to the vibrant weaves of the South, these crafts are not just a testament to the skill and creativity of India's artisans, but also a reflection of the country's diverse cultural tapestry."),
      p("At THS, we believe that these traditional crafts have a place not just in the homes and wardrobes of individuals, but also in the boardrooms and offices of the corporate world. Our mission is to bring these crafts into the modern age, to create products that are both functional and stylish, and to provide a platform for India's artisans to showcase their skills to a wider audience."),
      h("The Challenge of Modernizing Traditional Crafts"),
      p("Bringing traditional crafts into the corporate world is not without its challenges. Many of these crafts are deeply rooted in the cultural and social contexts of the communities that practice them, and adapting them to the needs and preferences of a modern, global audience can be a delicate balancing act."),
      p("One of the biggest challenges is finding ways to preserve the authenticity and integrity of the crafts while also making them relevant and appealing to a contemporary market. This requires a deep understanding of both the traditional techniques and the modern design language, and a willingness to experiment and innovate."),
      h("Our Approach to Modernizing Heritage"),
      p("At THS, we take a collaborative approach to modernizing traditional crafts. We work closely with our artisan partners to understand their skills, their traditions, and their unique perspectives, and to co-create products that showcase the best of their abilities."),
      p("Our design team works hand-in-hand with the artisans to develop new patterns, colors, and styles that are inspired by traditional motifs but infused with a modern aesthetic. We experiment with new materials and techniques, always striving to find the perfect balance between form and function."),
      p("One example of this approach is our line of handcrafted leather bags and accessories, which are made using traditional tanning and stitching techniques but designed with the modern professional in mind. The result is a collection of products that are both timeless and contemporary, with a level of craftsmanship and attention to detail that is rarely seen in mass-produced goods."),
      h("Empowering Artisans and Communities"),
      p("For us, modernizing heritage is not just about creating beautiful products - it's also about empowering the artisans and communities behind those products. Many of the craftspeople we work with come from marginalized backgrounds, often struggling to find steady work and fair wages in a rapidly changing world."),
      p("By providing them with a stable source of income and a platform to showcase their skills, we are helping to preserve not just the crafts themselves, but also the livelihoods and cultural identities of the communities that practice them. We invest in training and development programs to help our artisan partners improve their skills and adapt to new market demands, and we work to create long-term, sustainable partnerships that benefit everyone involved."),
      h("The Future of Traditional Crafts in the Corporate World"),
      p("As the world becomes increasingly globalized and digitized, it's easy to forget the value and importance of traditional crafts. But at THS, we believe that these crafts have a vital role to play in the modern world - not just as beautiful objects, but as a way of connecting us to our cultural heritage and to the people and communities behind the products we use every day."),
      p("By bringing these crafts into the corporate world, we are not only creating unique and meaningful products, but also helping to build a more sustainable and equitable future for India's artisans. We are proud to be a part of this movement, and we invite you to join us in celebrating the rich cultural heritage of India, one handcrafted product at a time."),
    ],
  },
  {
    slug: "reviving-traditional-crafts",
    title:
      "Reviving Traditional Crafts: Our Journey to Sustainable Corporate Gifting",
    excerpt:
      "Our journey into corporate gifting began with a simple question: can we create meaningful, eco-friendly gifts that showcase the beauty of traditional Indian crafts?",
    image: wixImage("dc7de4_148b8189784c4117b1d58e4afd6e7928~mv2.jpg"),
    imageAlt: "A handcrafted corporate gift set",
    body: [
      p("At THS, we've always been passionate about preserving India's rich cultural heritage while embracing sustainability. Our journey into the world of corporate gifting began with a simple question: Can we create meaningful, eco-friendly gifts that showcase the beauty of traditional Indian crafts?"),
      h("The Search for Sustainable Materials"),
      p("Our first step was to explore the vast array of natural materials used in Indian crafts for centuries. From bamboo and jute to organic cotton and handmade paper, we discovered a wealth of options that aligned with our commitment to sustainability."),
      p("We partnered with local artisans who have been working with these materials for generations, learning from their expertise and incorporating their techniques into our designs. By using locally sourced, renewable resources, we aim to minimize our environmental impact while supporting the livelihoods of these skilled craftspeople."),
      h("Reviving Forgotten Crafts"),
      p("As we delved deeper into the world of Indian handicrafts, we realized that many traditional techniques were on the verge of being lost forever. With younger generations opting for more modern occupations, the intricate skills passed down through families were at risk of disappearing."),
      p("We made it our mission to revive these fading crafts by incorporating them into our corporate gifting collections. From the delicate art of hand-block printing to the intricate weaving techniques of ikat, we worked closely with master artisans to create contemporary designs that would appeal to a corporate audience."),
      p("By bringing these crafts back into the spotlight, we hope to generate renewed interest and ensure their survival for generations to come."),
      h("Blending Tradition with Modern Aesthetics"),
      p("One of the biggest challenges we faced was bridging the gap between traditional crafts and modern corporate tastes. We knew that to make our gifts appealing to businesses, we needed to create designs that were both aesthetically pleasing and functional."),
      p("Our team of designers worked tirelessly to develop a range of products that seamlessly blended traditional techniques with contemporary styles. From sleek bamboo pens to elegant handwoven notebooks, each item in our collection tells a story of India's rich cultural heritage while catering to the needs of the modern workplace."),
      h("Empowering Artisans and Communities"),
      p("Beyond the preservation of crafts, our journey into sustainable corporate gifting has also been about empowering the artisans and communities behind these traditions. Many of the craftspeople we work with come from marginalized backgrounds, often struggling to make ends meet."),
      p("By providing them with steady work and fair wages, we aim to create a positive impact on their lives and the communities they support. We also invest in training programs to help them refine their skills and adapt to changing market demands."),
      p("Through our partnerships, we've seen firsthand how the revival of traditional crafts can have a ripple effect, bringing economic stability and renewed pride to entire villages."),
      h("The Road Ahead"),
      p("As we continue on this journey, we remain committed to exploring new ways to promote sustainability and preserve India's cultural heritage through corporate gifting. We're constantly seeking out new crafts to revive, new materials to work with, and new ways to make a positive impact."),
      p("We believe that by choosing sustainable, handcrafted gifts, businesses have the power to make a real difference - not just for the environment, but for the lives of the artisans and communities behind these beautiful traditions."),
      p("Join us on this journey, and discover the joy of gifting with a conscience."),
    ],
  },
  {
    slug: "gift-with-a-conscience",
    title: "Gift with a Conscience: The Rise of Sustainable Gift Hampers",
    excerpt:
      "Consumer preferences are shifting towards more sustainable, eco-friendly products — a trend that has extended to the world of corporate gifting.",
    image: wixImage("3581e8_0c8ddd6977ed4660987f38913a86b9b7~mv2.jpg"),
    imageAlt: "A sustainable gift hamper wrapped and ready to ship",
    body: [
      p("In recent years, there has been a significant shift in consumer preferences towards more sustainable and eco-friendly products. This trend has also extended to the world of corporate gifting, with businesses increasingly looking for ways to show their commitment to the environment and social responsibility through the gifts they choose. At THS, we've embraced this change by creating a range of sustainable gift hampers that showcase the best of India's eco-friendly crafts."),
      h("The Problem with Traditional Gift Hampers"),
      p("Traditionally, gift hampers have been filled with a variety of products, often packaged in excessive amounts of plastic and other non-biodegradable materials. Once the contents of the hamper have been used or consumed, the packaging ends up in landfills, contributing to the growing problem of environmental waste."),
      p("Moreover, many of the products included in these hampers are mass-produced, with little thought given to their environmental impact or the working conditions of the people who make them."),
      p("We knew there had to be a better way - a way to create gift hampers that not only delighted the recipient but also made a positive impact on the planet and the communities behind the products."),
      h("Curating a Collection of Sustainable Gifts"),
      p("Our first step in creating sustainable gift hampers was to curate a collection of eco-friendly products that showcased the best of India's green crafts. We sought out artisans and small businesses that were using natural, locally-sourced materials and traditional techniques to create beautiful, functional items."),
      p("From handwoven baskets made from bamboo to organic cotton textiles dyed with natural pigments, each product in our hampers tells a story of sustainability and cultural heritage. We also made sure to include a range of items that would appeal to different tastes and preferences, from gourmet food items to handcrafted home decor."),
      h("Packaging with a Purpose"),
      p("Of course, curating a collection of sustainable products was only half the battle - we also needed to ensure that our packaging was just as eco-friendly. We ditched the plastic and opted for biodegradable and recyclable materials like jute, cotton, and paper."),
      p("Our gift hampers are wrapped in reusable fabric bags or presented in handwoven baskets that can be repurposed long after the contents have been enjoyed. We also include a note with each hamper, explaining the story behind the products and the positive impact that the recipient's choice has made."),
      h("Empowering Artisans and Communities"),
      p("Beyond the environmental benefits, our sustainable gift hampers also have a significant social impact. Many of the artisans and small businesses we work with come from marginalized communities, often struggling to find steady work and fair wages."),
      p("By including their products in our hampers, we're not only providing them with a source of income but also helping to preserve the traditional crafts and techniques that have been passed down through generations. We work closely with our partners to ensure that they are paid fairly and have access to the resources and support they need to thrive."),
      h("The Future of Sustainable Gifting"),
      p("As more and more businesses and individuals become aware of the impact of their choices on the environment and society, we believe that sustainable gifting will continue to rise in popularity. By choosing a gift hamper that is both eco-friendly and socially responsible, companies can send a powerful message about their values and commitment to making a positive difference."),
      p("At THS, we're proud to be at the forefront of this movement, creating gift hampers that not only delight the senses but also make a tangible impact on the world around us. We believe that every gift has the power to tell a story - and by choosing a sustainable gift hamper, you're telling a story of hope, responsibility, and change."),
      p("Join us in the rise of sustainable gifting, and discover the joy of giving with a conscience."),
    ],
  },
  {
    slug: "eco-friendly-stationery",
    title:
      "The Story Behind Our Eco-Friendly Stationery: A Blend of Culture and Modernity",
    excerpt:
      "Stationery is more than a tool for writing or drawing — it's a medium for self-expression and a reflection of one's values.",
    image: wixImage("dc7de4_264843d261f448f0a8c377c3591a5b18~mv2.jpg"),
    imageAlt: "Eco-friendly, plantable seed-paper stationery",
    body: [
      p("At THS, we believe that stationery is more than just a tool for writing or drawing - it's a medium for self-expression and a reflection of one's values. When we set out to create our line of eco-friendly stationery, we wanted to craft products that not only served a practical purpose but also told a story of India's rich cultural heritage and our commitment to sustainability."),
      h("Discovering the Beauty of Handmade Paper"),
      p("Our journey began with a fascination for handmade paper, a craft that has been practiced in India for centuries. We were drawn to the unique texture and character of each sheet, knowing that no two pieces were exactly alike."),
      p("We visited small villages known for their papermaking traditions and met with the artisans who had been perfecting this craft for generations. We learned about the process of creating paper from natural fibers like cotton and silk, and how each step - from pulping to pressing - was done by hand."),
      p("It was here that we found the perfect material for our stationery: a luxurious, yet eco-friendly paper that showcased the beauty of this ancient craft."),
      h("Infusing Tradition with Modern Design"),
      p("While we wanted our stationery to pay homage to India's rich cultural heritage, we also knew that it needed to appeal to a modern audience. Our team of designers set out to create a range of products that blended traditional motifs with contemporary aesthetics."),
      p("We drew inspiration from the intricate patterns of block-printed textiles, the vibrant colors of Rajasthani art, and the elegant lines of Mughal architecture. Each design was carefully crafted to tell a story of India's diverse cultural tapestry while remaining fresh and relevant to today's tastes."),
      p("From the delicate floral borders on our notebooks to the bold geometric patterns on our gift wrap, every element was designed to celebrate the fusion of tradition and modernity."),
      h("Embracing Sustainability in Every Step"),
      p("Creating eco-friendly stationery wasn't just about choosing the right materials - it was about ensuring sustainability at every stage of production. We worked closely with our artisan partners to develop processes that minimized waste and used renewable resources wherever possible."),
      p("Our handmade paper is crafted from cotton rags, a byproduct of the textile industry that would otherwise end up in landfills. We also use natural dyes derived from plants and minerals to color our paper, avoiding the use of harmful chemicals."),
      p("Even our packaging is designed with the environment in mind. We use recycled materials and biodegradable options to ensure that our products leave the smallest possible carbon footprint."),
      h("Empowering Artisans and Communities"),
      p("Beyond creating beautiful, sustainable stationery, our mission is also to empower the artisans and communities behind these products. Many of the papermakers and craftspeople we work with come from marginalized backgrounds, often struggling to find steady work and fair wages."),
      p("By partnering with these artisans and providing them with consistent orders, we aim to create a positive impact on their lives and the communities they support. We also invest in training programs to help them refine their skills and adapt to changing market demands."),
      p("Through our work, we've seen how the creation of eco-friendly stationery can have a ripple effect, bringing economic stability and renewed pride to entire villages."),
      h("A Stationery Line That Tells a Story"),
      p("When you hold a piece of our eco-friendly stationery in your hands, you're not just holding a notebook or a card - you're holding a story. It's a story of India's rich cultural heritage, of the skilled artisans who crafted each piece by hand, and of our commitment to creating a more sustainable future."),
      p("We invite you to be a part of this story, to express yourself through the medium of our stationery, and to join us in celebrating the blend of culture and modernity that makes our products truly unique."),
    ],
  },
];

export function getDiaryPost(slug: string): DiaryPost | undefined {
  return DIARY_POSTS.find((post) => post.slug === slug);
}
