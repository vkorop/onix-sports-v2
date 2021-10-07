import fs from 'fs';
import Handlebars from 'handlebars';

export const tournamentPerformTemplate = (ctx: any) => {
  const hbs = fs.readFileSync(`${process.cwd()}/src/components/notification-listeners/statistics/templates/tournament.hbs`, {
    encoding: 'utf-8',
  });

  return Handlebars.compile(hbs)(ctx);
};