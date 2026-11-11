# Bugs
+ v7 Command Line Bug
  + Calling ```gameManager.state.Gems = 99999;``` or any number could give you infinite gems
  + Patched commands:
    + ```gameManager.state.Gems = 99999;```
    + ```gameManager.state.Coins = 99999;```
+ v9 Function Bug
  + Basically just the v7 Command Line bug but by calling the function ```addGems(999);``` or similar function
+ v9 Upgrade bug
  + Just the v9 function bug but with upgrade levels
+ v9 JSON Bug
  + Editing the JSON save file to give yourself OP stuff
  + Patched by encryption
+ v13 Gem & Coin glitch
  + Calling ```gameManager.state.gems = 99999;``` works again for gems and coins
  + Patched commands:
    + ```gameManager.state.gems = 99999;```
    + ```gameManager.state.coins = 99999;```
