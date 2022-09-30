export class Temple {
  constructor(
    public templeNo: number,
    public title: string,
    public description: string,
    public imageUrl: string,
    public place: string,
    public district: string,
    public state: string,
    public userId: string,
    public legend?: string,
    public youtubeLink?: string,
    public wikiLink?: string,
  ) {}
}
