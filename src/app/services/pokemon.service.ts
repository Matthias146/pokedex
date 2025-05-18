import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  // Direkter API-Basis-URL als Konstante
  private readonly baseUrl: string = 'https://pokeapi.co/api/v2/';
  private readonly pokemonUrl: string = this.baseUrl + 'pokemon/';

  private _pokemons: any[] = [];
  private _next: string = '';

  constructor(private http: HttpClient) {}

  get pokemons(): any[] {
    return this._pokemons;
  }

  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0
      ? pokemon.types[0].type.name
      : '';
  }

  get(name: string): Observable<any> {
    const url = `${this.pokemonUrl}${name}`;
    return this.http.get<any>(url);
  }

  getNext(): Observable<any> {
    const url = this._next === '' ? `${this.pokemonUrl}?limit=20` : this._next;
    return new Observable((observer) => {
      this.http.get<any>(url).subscribe({
        next: (res) => {
          this._next = res.next;
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  getEvolution(id: number): Observable<any> {
    const url = `${this.baseUrl}evolution-chain/${id}`;
    return this.http.get<any>(url);
  }

  getSpecies(name: string): Observable<any> {
    const url = `${this.baseUrl}pokemon-species/${name}`;
    return this.http.get<any>(url);
  }

  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      psychic: '#F85888',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      fairy: '#EE99AC',
      normal: '#A8A878',
      fighting: '#C03028',
      flying: '#A890F0',
      poison: '#A040A0',
      ground: '#E0C068',
      rock: '#B8A038',
      bug: '#A8B820',
      ghost: '#705898',
      steel: '#B8B8D0',
    };

    return colors[type] || '#A8A878'; // fallback: normal
  }
}
