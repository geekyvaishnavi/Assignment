import { Fragment } from 'react';
import { peerColumns, peerIndices, peerMedian, peerPath, peers } from '../../data/company';
import { ActionButton, SectionCard } from '../common';
import { Icon } from '../Icon';

export function PeerComparison() {
  return (
    <SectionCard id="peers">
      <h2 className="section-title section-title--spaced">Peer comparison</h2>

      <div className="toolbar">
        <div className="peer-path">
          {peerPath.map((step, i) => (
            <Fragment key={`${step.icon}-${step.label}`}>
              {i > 0 && <span className="peer-path__sep">›</span>}
              <a href="#peers">
                <Icon name={step.icon} /> {step.label}
              </a>
            </Fragment>
          ))}
        </div>
        <ActionButton>
          <Icon name="settings" /> EDIT COLUMNS
        </ActionButton>
      </div>

      <div className="part-of">
        <span className="part-of__label">Part of</span>
        {peerIndices.map((index) => (
          <span key={index} className="pill">
            {index}
          </span>
        ))}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th className="align-left">Company</th>
              {peerColumns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {peers.map((peer) => (
              <tr key={peer.name}>
                <td>{peer.serial}</td>
                <td className="align-left cell-bold">{peer.name}</td>
                {peer.values.map((value, i) => (
                  <td key={peerColumns[i]}>{value}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td />
              <td className="align-left cell-muted">{peerMedian.label}</td>
              {peerMedian.values.map((value, i) => (
                <td key={peerColumns[i]}>{value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="compare">
        <label className="compare__label" htmlFor="peer-compare">
          Detailed Comparison with:
        </label>
        <input id="peer-compare" placeholder="eg. Infosys" />
      </div>
    </SectionCard>
  );
}
