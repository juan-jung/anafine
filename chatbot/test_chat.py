import os
from dotenv import load_dotenv
import sys
sys.path.append("C:\\Users\\SSAFY\\Desktop\\A403\\S09P31A403\\chatbot\\langchain")

load_dotenv()

from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.agents import AgentType
from langchain.llms.openai import OpenAI

openai_api_key = os.getenv('OPENAI_API_KEY')
serpapi_api_key = os.getenv('SERPAPI_API_KEY')

llm = OpenAI(temperature=0, openai_api_key=openai_api_key)

tools = load_tools(["serpapi", "llm-math"], llm=llm)

agent = initialize_agent(tools, llm, agen=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

agent.chat("What is the meaning of life?")