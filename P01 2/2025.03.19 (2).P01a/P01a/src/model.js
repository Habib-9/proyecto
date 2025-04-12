const MAX_CREDITS = 200;
const MAX_TEAM_SIZE = 6;
const IMAGE_FILE_PATH = './images/';

// =========================
// Classe Base: Pokemon
// =========================
class Pokemon {
  constructor(id, name, image, points, special_power) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.points = points;
    this.special_power = special_power;
  }
  displayDetails() {
    return `${this.name} (ID: ${this.id}) - Points: ${this.points}`;
  }
}

// =========================
// Classes heredades per cada tipus de Pokémon
// =========================
class GrassPokemon extends Pokemon {}
class FirePokemon extends Pokemon {}
class WaterPokemon extends Pokemon {}
class ElectricPokemon extends Pokemon {}
class BugPokemon extends Pokemon {}
class NormalPokemon extends Pokemon {}
class PoisonPokemon extends Pokemon {}
class PsychicPokemon extends Pokemon {}
class GroundPokemon extends Pokemon {}
class FairyPokemon extends Pokemon {}
class RockPokemon extends Pokemon {}
class IcePokemon extends Pokemon {}
class DragonPokemon extends Pokemon {}
class DarkPokemon extends Pokemon {}
class SteelPokemon extends Pokemon {}
class GhostPokemon extends Pokemon {}
class FightingPokemon extends Pokemon {}
class FlyingPokemon extends Pokemon {}

// =========================
// Classe: PokemonList
// =========================
export class PokemonList {
  constructor() {
    this._allPokemons = [];
    this.isLoaded = false;
  }
  get allPokemons() {
    return [...this._allPokemons];
  }
  formatFilename(filename) {
    filename = filename.trim();
    let parts = filename.split(".");
    let name = parts.join(" ").replace(/\s+/g, " ");
    let words = name.split(" ");
    let formattedName =
      words.shift().toLowerCase() +
      words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("");
    console.log(`Carregant l'arxiu ${formattedName}.png.`);
    return `${formattedName}.png`;
  }
  loadPokemons(data) {
    try {
      data.map((pokemon, index) => {
        switch (pokemon.class_type) {
          case "GrassPokemon":
            this._allPokemons.push(
              new GrassPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "FirePokemon":
            this._allPokemons.push(
              new FirePokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "WaterPokemon":
            this._allPokemons.push(
              new WaterPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "ElectricPokemon":
            this._allPokemons.push(
              new ElectricPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "BugPokemon":
            this._allPokemons.push(
              new BugPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "NormalPokemon":
            this._allPokemons.push(
              new NormalPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "PoisonPokemon":
            this._allPokemons.push(
              new PoisonPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "PsychicPokemon":
            this._allPokemons.push(
              new PsychicPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "GroundPokemon":
            this._allPokemons.push(
              new GroundPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "FairyPokemon":
            this._allPokemons.push(
              new FairyPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "RockPokemon":
            this._allPokemons.push(
              new RockPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "IcePokemon":
            this._allPokemons.push(
              new IcePokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "DragonPokemon":
            this._allPokemons.push(
              new DragonPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "DarkPokemon":
            this._allPokemons.push(
              new DarkPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "SteelPokemon":
            this._allPokemons.push(
              new SteelPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "GhostPokemon":
            this._allPokemons.push(
              new GhostPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "FightingPokemon":
            this._allPokemons.push(
              new FightingPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "FlyingPokemon":
            this._allPokemons.push(
              new FlyingPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          default:
            console.log(`No s'ha trobat la classe ${pokemon.class_type}`);
            throw new Error(`Unknown class type: ${pokemon.class_type}`);
        }
      });
      this.isLoaded = true;
      console.log("Pokémon carregats correctament:", this._allPokemons.length);
    } catch (error) {
      console.error("Error carregant Pokémon des del JSON:", error);
      this.isLoaded = false;
    }
  }
  sortPokemons(criteria, method) {
    if (!this.isLoaded || this._allPokemons.length === 0) {
      console.error("❌ No tinc pokemons a la llista.");
    } else {
      if (["name", "points", "type"].includes(criteria) &&
          ["bubble", "insertion", "selection"].includes(method)) {
        console.log(`✅ Ordenat per '${criteria}' amb el mètode '${method}'.`);
        let len = this._allPokemons.length;
        switch (method) {
          case "bubble":
            for (let i = 0; i < len - 1; i++) {
              for (let j = 0; j < len - 1 - i; j++) {
                if (criteria === "name" && this._allPokemons[j].name > this._allPokemons[j + 1].name ||
                    criteria === "points" && this._allPokemons[j].points > this._allPokemons[j + 1].points ||
                    criteria === "type" && this._allPokemons[j].constructor.name > this._allPokemons[j + 1].constructor.name) {
                  [this._allPokemons[j], this._allPokemons[j + 1]] = [this._allPokemons[j + 1], this._allPokemons[j]];
                }
              }
            }
            break;
          case "insertion":
            for (let i = 1; i < len; i++) {
              let key = this._allPokemons[i];
              let j = i - 1;
              while (j >= 0 && (
                criteria === "name" && this._allPokemons[j].name > key.name ||
                criteria === "points" && this._allPokemons[j].points > key.points ||
                criteria === "type" && this._allPokemons[j].constructor.name > key.constructor.name
              )) {
                this._allPokemons[j + 1] = this._allPokemons[j];
                j--;
              }
              this._allPokemons[j + 1] = key;
            }
            break;
          case "selection":
            for (let i = 0; i < len - 1; i++) {
              let minIndex = i;
              for (let j = i + 1; j < len; j++) {
                if (criteria === "name" && this._allPokemons[j].name < this._allPokemons[minIndex].name ||
                    criteria === "points" && this._allPokemons[j].points < this._allPokemons[minIndex].points ||
                    criteria === "type" && this._allPokemons[j].constructor.name < this._allPokemons[minIndex].constructor.name) {
                  minIndex = j;
                }
              }
              if (minIndex !== i) {
                [this._allPokemons[i], this._allPokemons[minIndex]] = [this._allPokemons[minIndex], this._allPokemons[i]];
              }
            }
            break;
        }
      } else {
        console.error("❌ Criteri o mètode d'ordenació no vàlid.");
      }
    }
  }
  getPokemonByName(name) {
    return this._allPokemons.find(p => p.name === name);
  }
}

// =========================
// Classe: PokemonTeam
// =========================
export class PokemonTeam {
  constructor(credits = MAX_CREDITS, maxTeamSize = MAX_TEAM_SIZE) {
    this.selectedTeam = [];
    this.credits = credits;
    this.maxTeamSize = maxTeamSize;
  }
  addPokemon(pokemon) {
    if (this.selectedTeam.length >= this.maxTeamSize) {
      console.warn(`Cannot add ${pokemon.name}. Team is already full.`);
      return false;
    }
    if (this.credits < pokemon.points) {
      console.warn(`Cannot add ${pokemon.name}. Not enough credits.`);
      return false;
    }
    if (!this.selectedTeam.find(p => p.name === pokemon.name)) {
      this.selectedTeam.push(pokemon);
      this.credits -= pokemon.points;
      return true;
    } else {
      console.warn(`Pokemon ${pokemon.name} was already in the team.`);
      return false;
    }
  }
  removePokemon(pokemonName) {
    const index = this.selectedTeam.findIndex(p => p.name === pokemonName);
    if (index !== -1) {
      let damageMade = this.selectedTeam[index].special_power;
      this.credits += this.selectedTeam[index].points;
      this.selectedTeam.splice(index, 1);
      return damageMade;
    }
  }
  getTeamDetails() {
    return this.selectedTeam.map(p => p.displayDetails()).join("\n");
  }
  getTeam(){
    return this.selectedTeam;
  }
  getCredits() {
    return this.credits;
  }
  decreaseSpecialPower(winnerName, pointsToDecrease) {
    const winner = this.selectedTeam.find(p => p.name === winnerName);
    if (!winner) {
      return `El Pokémon ${winnerName} no s'ha trobat en l'equip.`;
    }
    winner.special_power -= pointsToDecrease;
    if (winner.special_power <= 0) {
      this.removePokemon(winnerName);
      return `☠️ ${winnerName} ha perdut tot el seu poder especial i s'ha eliminat de l'equip!`;
    }
    return `✅ ${winnerName} sobreviu amb un special power de: ${winner.special_power} punts.`;
  }
}

// =========================
// Classe: Player
// =========================
export class Player {
  constructor(name = "") {
    this.name = name;
    this.team = new PokemonTeam();
  }
  getName() {
    return this.name;
  }
  addPokemon(pokemon) {
    return this.team.addPokemon(pokemon);
  }
  removePokemon(pokemonName) {
    return this.team.removePokemon(pokemonName);
  }
  getTeamDetails() {
    return this.team.getTeamDetails();
  }
  getTeam(){
    return this.team.getTeam();
  }
  getCredits() {
    return this.team.getCredits();
  }
  attack(target) {
    // Implementació de la lògica d'atac (no crítica per a la migració)
  }
}
