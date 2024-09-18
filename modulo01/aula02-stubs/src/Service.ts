class Service {
  getPlanets() {

  }

  async makeRequest(url: string): Promise<any> {
    return await (await fetch(url)).json() as any
  }
}

export { Service };
