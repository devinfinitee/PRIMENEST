import AgentCard from '../AgentCard'
import agent1 from '@assets/generated_images/Female_real_estate_agent_e99fbd8d.png'

export default function AgentCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <AgentCard
        id="1"
        name="Jane Doe"
        title="PrimeNest Agent"
        photo={agent1}
        activeListings={15}
        experience="5 Years"
      />
    </div>
  )
}
