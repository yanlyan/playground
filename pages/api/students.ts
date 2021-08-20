import * as Faker from "faker";

export default (req, res) => {
  const students = [
    {
    name: "Clark",
    email: "Theo.Upton@hotmail.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Raheem",
    email: "Brandyn.Larkin@yahoo.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Robb",
    email: "Nico46@gmail.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Bethany",
    email: "Treva_Williamson@gmail.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Gunner",
    email: "Ivah_Kilback12@gmail.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Isaias",
    email: "Ellie46@yahoo.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Mallie",
    email: "Immanuel42@hotmail.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Lula",
    email: "Rodrigo38@gmail.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Winfield",
    email: "Alfreda33@hotmail.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Roberta",
    email: "Aubrey48@hotmail.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Jerad",
    email: "Alejandrin40@yahoo.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Esteban",
    email: "Rocky46@hotmail.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Jonatan",
    email: "Jose_Bruen@gmail.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Natalia",
    email: "Rigoberto36@yahoo.com",
    avatar: "http://placeimg.com/640/480",
    },
    {
    name: "Maribel",
    email: "Jayson31@yahoo.com",
    avatar: "http://placeimg.com/640/480",
    },
    ]
  res.status(200).json(students)
}
