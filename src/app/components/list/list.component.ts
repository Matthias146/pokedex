import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  pokemons: any[] = [];
  selectedPokemon: any = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getNext().subscribe((res: any) => {
      this.pokemons = res.results;
    });
  }

  openDetails(pokemon: any): void {
    this.pokemonService.get(pokemon.name).subscribe((res) => {
      this.selectedPokemon = res;

      const modal = document.getElementById('pokemonModal');
      const b = (window as any).bootstrap;

      if (!b) {
        console.error('⚠️ Bootstrap JS ist nicht geladen!');
        return;
      }

      if (modal) {
        const modalInstance = new b.Modal(modal);
        modalInstance.show();
      }
    });
  }
}
