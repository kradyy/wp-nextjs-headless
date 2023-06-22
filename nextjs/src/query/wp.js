import client from "@/client";
import { gql } from "@apollo/client";

export async function getSettings() {
    const { data } = await client.query({
      query: gql`
        query NewQuery {
            allSettings {
                generalSettingsDateFormat
                generalSettingsDescription
                generalSettingsEmail
                generalSettingsLanguage
                generalSettingsStartOfWeek
                generalSettingsTimeFormat
                generalSettingsTimezone
                generalSettingsTitle
                generalSettingsUrl
                readingSettingsPageForPosts
                readingSettingsPageOnFront
                readingSettingsPostsPerPage
            }   
        }
      `,
    });
  
    const { allSettings } = data;

    return allSettings;
  }
  