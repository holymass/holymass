export type LiturgicalYear = 'A' | 'B' | 'C';

export class Mass {
  constructor(
    public date: string,
    public firstReading: string,
    public gospel: string,
    public liturgicalYear: LiturgicalYear,
    public name: string,
    public pinyin: string,
    public responsorialPsalm: string,
    public secondReading: string,
  ) {}
}
