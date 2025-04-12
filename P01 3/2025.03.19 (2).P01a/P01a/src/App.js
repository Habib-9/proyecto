// IMPORTANTe //
// gerard si ves esto en la aplicacion al darle al boton atacar tienes que darle cada vez que quieres que empieze una ronda al boton atacar admes tienes que darle su tiempo para que funcione // 

// 📌 Adaptació del Projecte Pokémon a Vue (MVVM)
// Descripció: Aquesta aplicació ha estat migrada de JavaScript Vanilla a Vue utilitzant el patró MVVM. 

// 🔹 Canvis principals:
// 1️⃣ Eliminació de manipulació manual del DOM (`document.querySelector()`).
// 2️⃣ Implementació de Vue per gestionar l'estat amb `data()`, `computed` i `methods`.
// 3️⃣ Separació clara entre Model (dades del Pokémon), ViewModel (gestió de lògica) i View (components Vue).
// 4️⃣ Ús de directives Vue (`v-for`, `v-model`, `v-if`, `v-on`) per a la reactivitat.
// 5️⃣ Eliminació de la classe `PokemonUI` i comunicació directa amb `PokemonViewModel`.

import { PokemonTeamViewModel } from "./viewModel.js";
import PokemonCard from "./PokemonCard.js";

export const App = {
  components: {
    "pokemon-card": PokemonCard,
  },
  template: /*html*/ `
    <div>
      <!-- Configuració dels Jugadors -->
      <section v-if="currentScreen === 'setup'" class="setup-container">
        <h2 class="setup-title">Configuració dels Jugadors</h2>
        <p class="setup-instruccions">
          Introdueix els noms dels jugadors per començar el joc.
        </p>
        <div class="toggle-container">
          <label for="two-players-toggle">Dos Jugadors:</label>
          <label class="switch">
            <input type="checkbox" v-model="isTwoPlayers" id="two-players-toggle" />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="player-input-group">
          <label for="player1-name" class="player-label">Nom del Jugador 1:</label>
          <input type="text" v-model="player1Name" id="player1-name" class="player-input" required />
        </div>
        <div class="player-input-group" v-if="isTwoPlayers">
          <label for="player2-name" class="player-label">Nom del Jugador 2:</label>
          <input type="text" v-model="player2Name" id="player2-name" class="player-input" required />
        </div>
        <button @click="startGame" class="setup-button">Següent</button>
      </section>
      
      <!-- Selecció d'Equip -->
      <section v-if="currentScreen === 'teamSelection'" id="team-selection-section">
        <h2>Selecciona el teu Equip</h2>
        <h3>{{ currentPlayerSelectionMessage }}</h3>
        <h3 id="credits-display">
          Crèdits restants: <span id="credits-value">{{ creditsDisplay }}</span>
        </h3>
        <div id="team-section">
          <h3 id="current-player-selection">{{ currentPlayerSelectionDisplay }}</h3>
          <div id="selected-team-grid" class="grid-container">
            <pokemon-card
              v-for="(poke, index) in currentPlayerTeam"
              :key="index"
              :pokemon="poke"
              :is-selected="isPokemonInTeam(poke.name)"
              @toggle-selection="handleToggleSelection"
            />
          </div>
        </div>
        <button id="next-player-button" @click="handleNextPlayer">
          {{ buttonLabel }}
        </button>
        <!-- Opcions d'Ordenació -->
        <div id="sort-options-section">
          <h2>Opcions d'Ordenació</h2>
          <form id="sort-options-form" @submit.prevent="handleSortOptions">
            <fieldset>
              <legend>Ordena per:</legend>
              <label>
                <input type="radio" name="sort-criteria" value="name" v-model="sortCriteria" />
                Nom
              </label>
              <label>
                <input type="radio" name="sort-criteria" value="points" v-model="sortCriteria" />
                Punts
              </label>
              <label>
                <input type="radio" name="sort-criteria" value="type" v-model="sortCriteria" />
                Tipus
              </label>
            </fieldset>
            <fieldset>
              <legend>Mètode d'ordenació:</legend>
              <label>
                <input type="radio" name="sort-method" value="bubble" v-model="sortMethod" />
                Bombolla
              </label>
              <label>
                <input type="radio" name="sort-method" value="insertion" v-model="sortMethod" />
                Inserció
              </label>
              <label>
                <input type="radio" name="sort-method" value="selection" v-model="sortMethod" />
                Selecció
              </label>
            </fieldset>
            <button type="button" id="sort-team" @click="handleSortOptions">Ordenar</button>
          </form>
        </div>
        <div id="pokemon-grid" class="grid-container">
          <pokemon-card
            v-for="(poke, index) in globalPokemonList"
            :key="index"
            :pokemon="poke"
            :is-selected="isPokemonInTeam(poke.name)"
            @toggle-selection="handleToggleSelection"
          />
        </div>
      </section>
      
      <!-- Vista de Batalla -->
      <section v-if="currentScreen === 'battle'" id="battle-section">
        <h2>Moment de la Batalla!</h2>
        <p id="current-turn-display">És el torn del {{ currentTurnPlayer }}!</p>
        
        <!-- Visualització dels equips de cada jugador -->
        <div class="teams-container">
          <div class="player1-team-container">
            <h3>Equip del Jugador 1</h3>
            <div class="team-grid">
              <pokemon-card
                v-for="(poke, idx) in viewModel.player1.team.selectedTeam"
                :key="idx"
                :pokemon="poke"
              />
            </div>
          </div>
          <div class="player2-team-container">
            <h3>Equip del Jugador 2</h3>
            <div class="team-grid">
              <pokemon-card
                v-for="(poke, idx) in viewModel.player2.team.selectedTeam"
                :key="idx"
                :pokemon="poke"
              />
            </div>
          </div>
        </div>
        
        <!-- Arena de Combat i Registre de la Batalla -->
        <div class="battle-display-container">
          <div id="battle-arena" class="battle-arena">
            <div id="pokemon1-display" class="pokemon-fighter">
              <div v-if="currentBattle && currentBattle.pokemon1">
                <pokemon-card :pokemon="currentBattle.pokemon1" />
              </div>
            </div>
            <p class="vs-text">VS</p>
            <div id="pokemon2-display" class="pokemon-fighter">
              <div v-if="currentBattle && currentBattle.pokemon2">
                <pokemon-card :pokemon="currentBattle.pokemon2" />
              </div>
            </div>
          </div>
          <div class="battle-log-container">
            <h2>Registre de la Batalla</h2>
            <div class="battle-log">
              <div v-for="(msg, i) in battleLog" :key="i" v-html="msg"></div>
            </div>
          </div>
        </div>
        
        <button id="perform-attack-button" @click="startBattle">Atacar!</button>
      </section>
    </div>
  `,
  data() {
    return {
      // Variable per determinar l'estat actual de la pantalla (setup, teamSelection, battle)
      currentScreen: "setup",
      isTwoPlayers: true,
      player1Name: "",
      player2Name: "",
      currentPlayerSelectionMessage: "",
      currentPlayerSelectionDisplay: "",
      sortCriteria: "name",
      sortMethod: "bubble",
      globalPokemonList: [],
      buttonLabel: "Següent Jugador",
      // Instància directa del ViewModel (sense la classe PokemonUI)
      viewModel: new PokemonTeamViewModel(),
      // Propietats reactives per a la batalla
      currentBattle: null,
      battleLog: []
    };
  },
  computed: {
    // Mostra el crèdit restant del jugador actual
    creditsDisplay() {
      return this.viewModel.currentPlayer.team.getCredits();
    },
    // Obté l'equip del jugador actual
    currentPlayerTeam() {
      return this.viewModel.getCurrentTeam();
    },
    // Mostra el nom del jugador que té el torn actual
    currentTurnPlayer() {
      return this.viewModel.currentPlayer.name;
    }
  },
  methods: {
    // 🔹 Inicia el joc i carrega els equips Pokémon
    async startGame() {
        // Validació: Comprova que els jugadors han introduït un nom
        if (!this.player1Name || (this.isTwoPlayers && !this.player2Name)) {
            alert("Si us plau, introdueix els noms de tots els jugadors.");
            return;
        }
        
        // Si només hi ha un jugador, assigna "CPU" al segon jugador
        if (!this.isTwoPlayers) {
            this.player2Name = "CPU";
        }

        // Carrega la llista de Pokémon i inicialitza la partida
        await this.fetchAndLoadPokemons();
        this.viewModel.initializeMatch(this.player1Name, this.player2Name);

        // Configura la selecció d'equip per al jugador 1
        this.currentPlayerSelectionMessage = `${this.player1Name}, selecciona el teu equip Pokémon`;
        this.currentPlayerSelectionDisplay = this.player1Name;

        // Mostra la llista de Pokémon disponibles
        this.globalPokemonList = this.viewModel.getGlobalList();

        // Canvia a la pantalla de selecció d'equip
        this.currentScreen = "teamSelection";
    },

    // Mètode per carregar les dades dels Pokémon des d'un arxiu JSON
    async fetchAndLoadPokemons() {
      try {
        const response = await fetch("./pokemon_data.json");
        if (!response.ok) throw new Error("HTTP error: " + response.status);
        const data = await response.json();
        this.viewModel.pokemonList.loadPokemons(data);
      } catch (error) {
        console.error("Error loading Pokémon data:", error);
      }
    },

    // Gestiona el pas al següent jugador o la transició a la batalla
    handleNextPlayer() {
      const currentTeam = this.viewModel.getCurrentTeam();
      if (currentTeam.length === 0) {
        alert("Selecciona almenys un Pokémon per continuar.");
        return;
      }
      // Si el jugador actual és el primer, canvia al segon jugador
      if (this.viewModel.currentPlayer === this.viewModel.player1) {
        this.viewModel.switchPlayer();
        if (this.isTwoPlayers) {
          this.currentPlayerSelectionMessage = `${this.player2Name}, selecciona el teu Pokémon`;
          this.currentPlayerSelectionDisplay = this.player2Name;
          this.buttonLabel = "Fi de la selecció d'equips";
        } else {
          // Si no hi ha segon jugador (jugador vs. CPU)
          this.currentPlayerSelectionMessage = `${this.player2Name} ha seleccionat el seu equip.`;
          this.viewModel.autoSelectCpuTeam();
          this.buttonLabel = "Fi de la selecció d'equips";
        }
      } else {
        // Si ambdós jugadors han seleccionat els seus equips, passa a la pantalla de batalla
        const secondTeam = this.viewModel.getCurrentTeam();
        if (secondTeam.length === 0) {
          alert("El segon jugador no té cap Pokémon seleccionat.");
          return;
        }
        this.currentScreen = "battle";
      }
    },

    // Gestiona les opcions d'ordenació dels Pokémon
    handleSortOptions() {
      this.viewModel.sortGlobalList(this.sortCriteria, this.sortMethod);
      this.globalPokemonList = this.viewModel.getGlobalList();
    },

    // Verifica si un Pokémon ja està al equip del jugador actual
    isPokemonInTeam(name) {
      const currentVM = this.viewModel;
      const playerTeam =
        currentVM.currentPlayer === currentVM.player1
          ? currentVM.player1.team
          : currentVM.player2.team;
      return playerTeam.selectedTeam.some((p) => p.name === name);
    },

    // Gestiona la selecció/deselecció d'un Pokémon al fer clic sobre la carta
    handleToggleSelection(pokemon) {
      const isInTeam = this.isPokemonInTeam(pokemon.name);
      if (isInTeam) {
        this.viewModel.removePokemonFromTeam(pokemon.name);
      } else {
        const addResult = this.viewModel.addPokemonToCurrentPlayer(pokemon);
        if (!addResult) {
          alert("No es pot afegir el Pokémon.");
        }
      }
    },

    // Inicia una ronda de batalla entre Pokémon seleccionats
    async startBattle() {
      // Executa la ronda de combat a través del ViewModel
      const roundResult = await this.viewModel.fightRound();
      if (roundResult) {
        // Actualitza la vista amb els Pokémon que han combatut
        this.currentBattle = {
          pokemon1: roundResult.pokemon1,
          pokemon2: roundResult.pokemon2
        };
        // Afegeix el missatge de resultat al registre de la batalla
        this.battleLog.push(roundResult.outcomeMessage);
      }
      // Comprova si algun dels equips s'ha quedat sense Pokémon i finalitza la batalla
      if (
        this.viewModel.player1.team.selectedTeam.length === 0 ||
        this.viewModel.player2.team.selectedTeam.length === 0
      ) {
        const winner =
          this.viewModel.player1.team.selectedTeam.length > 0
            ? this.viewModel.player1.name
            : this.viewModel.player2.name;
        // Mostra missatge final indicant el guanyador de la batalla
        this.battleLog.push(`🏆 La batalla ha acabat! ${winner} és el guanyador!`);
      }
    }
  }
};
