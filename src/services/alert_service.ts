import type AlertMessageDto from '@/dtos/alert_message_dto';
import { Observer, Subject, Subscription } from 'rxjs';

export default class AlertService {
  private _subject: Subject<AlertMessageDto>;
  private _subscription?: Subscription;

  constructor(observer?: Observer<AlertMessageDto>) {
    this._subject = new Subject();
    if (observer) {
      this._subscription = this.subscribe(observer);
    }
  }

  private _generateId(): string {
    return Array.from(
      window.crypto.getRandomValues(new Uint8Array(10)),
      (dec) => dec.toString(16).padStart(2, '0')
    ).join('');
  }

  public sendAlert(message: Omit<AlertMessageDto, 'id'>): void {
    this._subject.next({ ...message, id: this._generateId() });
  }

  public subscribe(observer: Observer<AlertMessageDto>): Subscription {
    return this._subject.subscribe(observer);
  }

  public clean(): void {
    this._subscription?.unsubscribe();
    this._subject.complete();
  }
}
