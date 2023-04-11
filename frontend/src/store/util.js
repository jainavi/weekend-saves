export function balanceCount(saves) {
  for (let i = 0; i < 3; i++) {
    saves[i].count = saves[i].savesArr ? saves[i].savesArr.length : 0;
  }
}
