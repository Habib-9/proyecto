import { Player, PokemonList, PokemonTeam } from "./model.js";

export class PokemonTeamViewModel {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.currentPlayer = this.player1;
    this.team = new PokemonTeam();
    this.pokemonList = new PokemonList();
  }
  initializeMatch(player1Name, player2Name) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.currentPlayer = this.player1;
  }
  switchPlayer() {
    if (this.currentPlayer.name === this.player1.name) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }
  getCurrentPlayer() {
    return this.currentPlayer;
  }
  areTeamsComplete() {
    return (
      this.player1.team.selectedTeam.length === this.player1.team.maxTeamSize &&
      this.player2.team.selectedTeam.length === this.player2.team.maxTeamSize
    );
  }
  addPokemonToTeam(name) {
    const pokemon = this.pokemonList.getPokemonByName(name);
    if (!pokemon) {
      console.error("❌ Pokémon not found in the global list.");
      return;
    }
    if (this.team.getCredits() < pokemon.points) {
      console.error("❌ Not enough credits to add this Pokémon!");
      return;
    }
    const success = this.team.addPokemon(pokemon);
    if (!success) {
      console.warn(`⚠️ The Pokémon ${pokemon.name} is already on the team.`);
    }
  }
  addPokemonToCurrentPlayer(pokemon) {
    if (this.currentPlayer === this.player1) {
      return this.player1.team.addPokemon(pokemon);
    } else if (this.currentPlayer === this.player2) {
      return this.player2.team.addPokemon(pokemon);
    }
  }
  removePokemonFromTeam(pokemonName) {
    if (this.currentPlayer === this.player1) {
      return this.player1.team.removePokemon(pokemonName);
    } else if (this.currentPlayer === this.player2) {
      return this.player2.team.removePokemon(pokemonName);
    }
  }
  sortGlobalList(criteria, method) {
    this.pokemonList.sortPokemons(criteria, method);
  }
  getGlobalList() {
    return this.pokemonList.allPokemons;
  }
  getTeamDetails() {
    return this.team.getTeamDetails();
  }
  getCurrentTeam() {
    return this.currentPlayer === this.player1
      ? this.player1.getTeam()
      : this.player2.getTeam();
  }
  getCredits() {
    return this.currentPlayer.team.getCredits();
  }
  setPlayerNames(player1Name, player2Name) {
    this.player1.name = player1Name;
    this.player2.name = player2Name;
  }
  autoSelectCpuTeam() {
    console.log("⚙️ Auto-selecting Pokémon for CPU...");
    const cpuTeam = this.player2.team;
    const availablePokemons = [...this.pokemonList.allPokemons];
    for (let i = availablePokemons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availablePokemons[i], availablePokemons[j]] = [availablePokemons[j], availablePokemons[i]];
    }
    for (let pokemon of availablePokemons) {
      if (
        cpuTeam.selectedTeam.length < cpuTeam.maxTeamSize &&
        cpuTeam.credits >= pokemon.points
      ) {
        cpuTeam.addPokemon(pokemon);
      }
      if (cpuTeam.selectedTeam.length >= cpuTeam.maxTeamSize) break;
    }
    console.log(`✅ CPU team selected: ${cpuTeam.getTeamDetails()}`);
  }
  async startBattle() {
    console.log("🔥 Iniciant la batalla...");
    const roundResult = await this.fightRound();
    return roundResult;
  }
  async fightRound() {
    const pokemon1 = this.getRandomFighter(this.player1.team);
    const pokemon2 = this.getRandomFighter(this.player2.team);
    if (!pokemon1 || !pokemon2) return null;
    console.log(`⚔️ Combat: ${pokemon1.name} vs ${pokemon2.name}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    let outcomeMessage = "";
    if (pokemon1.special_power == pokemon2.special_power) {
      outcomeMessage = `💥 ${pokemon1.name} i ${pokemon2.name} es derroten mútuament!`;
      this.player2.team.removePokemon(pokemon2.name);
      this.player1.team.removePokemon(pokemon1.name);
    } else if (pokemon1.special_power > pokemon2.special_power) {
      outcomeMessage = `💥 ${pokemon1.name} derrota ${pokemon2.name}!`;
      let damageMade = this.player2.team.removePokemon(pokemon2.name);
      outcomeMessage += " " + this.player1.team.decreaseSpecialPower(pokemon1.name, damageMade);
    } else {
      outcomeMessage = `💥 ${pokemon2.name} derrota ${pokemon1.name}!`;
      let damageMade = this.player1.team.removePokemon(pokemon1.name);
      outcomeMessage += " " + this.player2.team.decreaseSpecialPower(pokemon2.name, damageMade);
    }
    return {
      pokemon1,
      pokemon2,
      outcomeMessage
    };
  }
  getRandomFighter(team) {
    if (team.selectedTeam.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * team.selectedTeam.length);
    return team.selectedTeam[randomIndex];
  }
}
