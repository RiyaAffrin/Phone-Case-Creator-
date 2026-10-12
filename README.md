# WEB103 Project 4 - Cutie Case 🎀

Submitted by: **Riya Affrin**

About this web app: **Cutie Case is a phone case designer with a pastel pink Sanrio-inspired look. You pick a base color, a pattern, and a charm, then add stickers and drag them wherever you want on the case. The preview updates live and the price changes as you pick things. You can save your designs and view, edit, or delete them later.**

Time spent: **20** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [x]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **Users can view **multiple** features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- [x] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected *OR* The app displays the total price of all features.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**


The following **optional** features are implemented:

- [ ] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [x] Stickers can be dragged anywhere on the case, and removed with an x button
- [x] Impossible combo rules: max 5 stickers, max 3 stickers on busy patterns (hearts, stars, checkers), and no stickers covering the camera
- [x] Hanging charm as an extra customizable feature
- [x] Auto-generated design name (like "Strawberry Milk Stripes") if the name is left blank
- [x] Small live previews of every saved case in the list view
- [x] Pastel pink Sanrio-style theme with cute error messages

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='docs/walkthrough.gif' title='Video Walkthrough' width='600' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ScreenToGif
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

I struggled a lot with the backend part of this project. The first big problem was connecting to the Render database. I kept getting an SSL error, and it took me a lot of time to figure out that my .env file was still empty and had placeholder text in it. Then I used the short internal hostname instead of the full external one that ends in .render.com, and I also had a stray quote at the end of one line, so I had to redo my .env a few times before it finally connected.

I also struggled with the stickers. At first I saved them as just a list of ids in the database, but then I wanted users to drag stickers anywhere, which meant I had to save positions too. It took me a lot of time to redo it, and I changed the table to store stickers as JSON with an x and y for each one, then rewrote my reset.js, my controllers, and my pages to match. After that I got a blank screen when saving because one of my pages was still using the old sticker variable, and it took me a while to find it.

Smaller things that tripped me up: I ran npm install in the wrong folder at the start, Postgres sends the prices back as strings so I had to convert them to numbers before adding them up, and I had to remember to re-run reset.js every time I changed my tables.

## License

Copyright 2026 Riya Affrin

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.