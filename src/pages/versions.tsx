import React from 'react';
import Layout from '@theme/Layout';
import versions from '../../versions.json';

export default function Versions(): React.JSX.Element {
  const latestVersion = versions[0];
  const pastVersions = versions.slice(1);

  return (
    <Layout title="Versions" description="API Documentation Versions">
      <div className="container margin-vert--lg">
        <h1>API Documentation Versions</h1>
        <div className="margin-bottom--lg">
          <h3 id="latest">Current version (Stable)</h3>
          <p>Latest stable version of the API documentation.</p>
          <table>
            <tbody>
              <tr>
                <th>{latestVersion}</th>
                <td>
                  <a href={`/docs/intro`}>Documentation</a>
                </td>
                <td>
                  <a href={`https://github.com/writdev-alt/api-docs/releases/tag/v${latestVersion}`}>
                    Release Notes
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {pastVersions.length > 0 && (
          <div className="margin-bottom--lg">
            <h3 id="archive">Past Versions</h3>
            <p>Documentation for older versions of the API.</p>
            <table>
              <tbody>
                {pastVersions.map((version) => (
                  <tr key={version}>
                    <th>{version}</th>
                    <td>
                      <a href={`/docs/${version}/intro`}>Documentation</a>
                    </td>
                    <td>
                      <a href={`https://github.com/writdev-alt/api-docs/releases/tag/v${version}`}>
                        Release Notes
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

