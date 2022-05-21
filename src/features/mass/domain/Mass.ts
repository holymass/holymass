export type LiturgicalYear = 'A' | 'B' | 'C';

export default class Mass {
  constructor(
    public date: string,
    public firstReading: string,
    public gospel: string,
    public liturgicalYear: string,
    public name: string,
    public pinyin: string,
    public responsorialPsalm: string,
    public secondReading: string,
  ) {}

  get title(): string {
    return `${this.liturgicalYear}${this.name}`;
  }
}
