const dragons = [
  {
    name: "Tiamat",
    image:
      "https://static.wikia.nocookie.net/forgottenrealms/images/9/9a/Tiamat.png",
    age: 8929,
    rate: 10,
    favorite: false,
    description:
      "Lawful evil and Chaotic evil. The lawful evil dragon goddess of greed, queen of evil dragons and, for a time, reluctant servant of the greater gods Bane and later Asmodeus. Before entering the Faerûnian pantheon, she was a member of the Draconic pantheon, and for some time she was also a member of the Untheric pantheon. Tiamat was also the eternal rival of her brother Bahamut, ruler of the good metallic dragons.",
    id: 110102,
  },
  {
    name: "Bahamut",
    image:
      "https://static.wikia.nocookie.net/forgottenrealms/images/4/40/Aspect_of_Bahamut.jpg",
    age: 8929,
    rate: 10,
    favorite: true,
    description:
      "Lawful good. The dragon god of justice and a subservient deity to Torm, god of law. Before entering the Faerûnian pantheon, he was a member of the Draconic pantheon, as a deity of good dragons, metallic dragons, wisdom, and enlightened justice (justice tempered with mercy and punishment with forgiveness) known by the name of Xymor (pronounced: /ˈzaɪmɔːr/ ZIE-more). For some time, he was also a member of the Untheric pantheon, under the alias of Marduk. His natural form was that of a platinum dragon, said by many to be the only one of his kind.He was also the eternal rival of his sister Tiamat, queen of the chromatic dragons.",
    id: 110101,
  },
  {
    name: "Adult Black Dragon",
    image: "https://www.dnd5eapi.co/api/images/monsters/adult-black-dragon.png",
    age: 2982,
    rate: 7,
    favorite: false,
    description:
      "Chaotic evil. The most evil-tempered and vile of the chromatic dragons, black dragons collect the wreckage and treasures of fallen peoples. Black dragons dwell in swamps on the frayed edges of civilization. A black dragon’s lair is a dismal cave, grotto, or ruin that is at least partially flooded, providing pools where the dragon rests, and where its victims can ferment. The lair is littered with the acid-pitted bones of previous victims and the fly-ridden carcasses of fresh kills, watched over by crumbling statues. Centipedes, scorpions, and snakes infest the lair, which is filled with the stench of death and decay.",
    id: 210200,
  },
  {
    name: "Ancient Gold Dragon",
    image: "https://5e.tools/img/bestiary/MM/Gold%20Dragon.jpg",
    age: 4815,
    rate: 8,
    favorite: false,
    description:
      "Lawful good. The most powerful and majestic of the metallic dragons, gold dragons are dedicated foes of evil. A gold dragon has a sagacious face anointed with flexible spines that resemble whiskers. Its horns sweep back from its nose and brow, echoing twin frills that adorn its long neck. A gold dragon's sail-like wings start at its shoulders and trace down to the tip of its tail, letting it fly with a distinctive rippling motion as if swimming through the air. A gold dragon wyrmling has scales of dark yellow with metallic flecks. Those flecks grow larger as the dragon matures. As a gold dragon ages, its pupils fade until its eyes resemble pools of molten gold.",
    id: 240055,
  },
  {
    name: "Bakunawa",
    image: "https://5e.tools/img/bestiary/JttRC/Bakunawa.webp",
    age: 1917,
    rate: 6,
    favorite: false,
    description:
      "Neutral. Worshiped as draconic avatars of storm and tide, bakunawa soar over the archipelagos they call home. Iridescent scales crackling with lightning cover a bakunawa's fearsome serpentine body, and the sharp movements of its mighty wings echo with thunderous winds. Known for their mercilessness in battle, bakunawa swallow whole any who challenge them.",
    id: 215043,
  },
];

export { dragons };

/*
// Запасные экстра драконы
const lildrags = [
    {
        "name": "Ol' mae",
        "image": "https://preview.redd.it/0vawbcrvmw6a1.jpg?width=2560&format=pjpg&auto=webp&s=6be406c114522520996aacc70cc88bc6137d87ca",
        "age": 5,
        "rate": 5,
        "favorite": false,
        "description": "Crunchy socks",
        "id": 8001723
    },
    {
        "name": "Violly",
        "image": "https://preview.redd.it/m59acpyvmw6a1.jpg?width=1527&format=pjpg&auto=webp&s=fb25959cd0b42cd214133f50c78cd6dc286f87da",
        "age": 45,
        "rate": 4,
        "favorite": false,
        "description": "Little party never killed somebody. Little coffee did.",
        "id": 8001745
    },
    {
        "name": "Fluff",
        "image": "https://preview.redd.it/mi96zw3wmw6a1.jpg?width=2299&format=pjpg&auto=webp&s=62c092825a6b15ffd8e650ca36e81de21aa8e88a",
        "age": 99,
        "rate": 8,
        "favorite": true,
        "description": "4 paws. Tail. And furr. Ain't that a cat? Indeed. Cat. Cute. Almost.",
        "id": 8005202
    },
    {
        "name": "LimpleLick",
        "image": "https://preview.redd.it/ht63ctcwmw6a1.jpg?width=2560&format=pjpg&auto=webp&s=43df8621d070c008cb4993c93f533acd53a07925",
        "age": 582017,
        "rate": 1,
        "favorite": false,
        "description": "Lawful evil. Cunny fella.",
        "id": 8040113
    }
]

// добавляем дополнительных драконов
lildrags.forEach((e) => {
api.addNewDragon(e)
})
*/
