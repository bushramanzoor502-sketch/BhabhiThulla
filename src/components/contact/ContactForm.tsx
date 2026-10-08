import { useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../../config/site';
import { Icon } from '../ui/Icon';
import './ContactForm.css';

type Field = 'name' | 'email' | 'subject' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: '', email: '', subject: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS: Record<Field, number> = { name: 80, email: 120, subject: 120, message: 3000 };

export function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = 'Please tell us your name.';
  else if (v.name.trim().length < 2) e.name = 'Your name needs at least 2 characters.';
  if (!v.email.trim()) e.email = 'Please enter your email address so we can reply.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'That email address doesn’t look right. Check for typos, e.g. name@example.com.';
  if (!v.subject.trim()) e.subject = 'Please add a short subject.';
  if (!v.message.trim()) e.message = 'Please write your message.';
  else if (v.message.trim().length < 10) e.message = 'Your message needs at least 10 characters.';
  return e;
}

/**
 * Builds a mailto: link with the message pre-filled. There is no backend, so the site never claims to have
 * "sent" anything: the visitor's own email app sends it. Swap `deliver` for an API call to add a backend later.
 */
function deliver(v: Values) {
  const body = `${v.message.trim()}\n\n—\nFrom: ${v.name.trim()} <${v.email.trim()}>\nSent via the ${site.name} website`;
  const href = `mailto:${site.email}?subject=${encodeURIComponent(`[${site.name}] ${v.subject.trim()}`)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}

const FIELDS: { id: Field; label: string; type?: string; auto?: string; area?: boolean }[] = [
  { id: 'name', label: 'Your name', auto: 'name' },
  { id: 'email', label: 'Your email', type: 'email', auto: 'email' },
  { id: 'subject', label: 'Subject', auto: 'off' },
  { id: 'message', label: 'Message', area: true },
];

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const update = (f: Field, val: string) => {
    const next = { ...values, [f]: val.slice(0, LIMITS[f]) };
    setValues(next);
    if (touched[f]) setErrors((prev) => ({ ...prev, [f]: validate(next)[f] }));
  };

  const blur = (f: Field) => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors((prev) => ({ ...prev, [f]: validate(values)[f] }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, message: true });
    const first = (Object.keys(errs) as Field[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#cf-${first}`)?.focus();
      return;
    }
    deliver(values);
    setDone(true);
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setDone(false);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <div className="cf">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            ref={statusRef}
            tabIndex={-1}
            role="status"
            className="cf__done"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, rotateY: 90, transition: { duration: 0.3 } }}
          >
            <span className="cf__done-icon">
              <Icon name="check" />
            </span>
            <h3 className="cf__done-title">Your email app should now be open</h3>
            <p>
              We’ve filled in your message, ready to go. Press <strong>Send</strong> in your email app to deliver it to{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            <p className="cf__done-small">
              Nothing opened? Your device may not have an email app set up. Copy the address above and write to us from any email
              service.
            </p>
            <button type="button" className="btn btn--ghost" onClick={reset}>
              <span className="btn__label">Write another message</span>
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            className="cf__form"
            noValidate
            onSubmit={submit}
            aria-describedby="cf-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, rotateY: 90, transition: { duration: 0.3 } }}
          >
            <div className="cf__live" aria-live="polite">
              {errorCount > 0 && touched.message && (
                <p className="cf__summary">
                  {errorCount === 1 ? 'One field needs attention.' : `${errorCount} fields need attention.`}
                </p>
              )}
            </div>
            {FIELDS.map((f) => {
              const err = touched[f.id] ? errors[f.id] : undefined;
              const props = {
                id: `cf-${f.id}`,
                name: f.id,
                value: values[f.id],
                autoComplete: f.auto,
                required: true,
                maxLength: LIMITS[f.id],
                'aria-invalid': err ? true : undefined,
                'aria-describedby': err ? `cf-${f.id}-err` : undefined,
                onBlur: () => blur(f.id),
                className: `cf__input ${err ? 'is-error' : ''} ${values[f.id] ? 'has-value' : ''}`,
                placeholder: ' ',
              };
              return (
                <div key={f.id} className={`cf__field ${f.area ? 'cf__field--area' : ''}`}>
                  {f.area ? (
                    <textarea {...props} rows={6} onChange={(e) => update(f.id, e.target.value)} />
                  ) : (
                    <input {...props} type={f.type ?? 'text'} onChange={(e) => update(f.id, e.target.value)} />
                  )}
                  <label htmlFor={`cf-${f.id}`} className="cf__label">
                    {f.label}
                  </label>
                  {f.area && (
                    <span className="cf__count" aria-hidden="true">
                      {values.message.length}/{LIMITS.message}
                    </span>
                  )}
                  <AnimatePresence>
                    {err && (
                      <motion.p
                        id={`cf-${f.id}-err`}
                        className="cf__error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {err}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <div className="cf__actions">
              <button type="submit" className="btn btn--gold">
                <span className="btn__label">Send message</span>
                <span className="btn__icon" aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </button>
              <p id="cf-note" className="cf__note">
                Sending opens your email app with your message ready. We never store what you type here.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
